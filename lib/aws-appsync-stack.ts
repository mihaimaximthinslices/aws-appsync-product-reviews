import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

import { Construct } from 'constructs';
import { config } from 'dotenv';

config();

export class AwsAppsyncStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC');

    const securityGroup = this.configureSecuritygroup(vpc);

    const db = this.configureRdsDatabase(vpc, securityGroup);

    const { userPool, userPoolClient } = this.configureUserPool();

    const api = this.configureGraphQlApi(userPool);

    const { userQueriesLambda, productReviewsLambdaDs } =
      this.configureProductReviewsLambda(vpc, securityGroup, db, api);

    const userQueriesLambdaDs = this.configureUserQueriesLambda(
      userQueriesLambda,
      userPool,
      api,
    );

    this.configureGraphQlResolvers(productReviewsLambdaDs, userQueriesLambdaDs);

    const { siteBucket, cloudfrontDistribution } =
      this.configureFrontendHosting();

    this.logStuff(
      api,
      userPool,
      userPoolClient,
      db,
      siteBucket,
      cloudfrontDistribution,
    );
  }

  private configureSecuritygroup(vpc: cdk.aws_ec2.Vpc) {
    const securityGroup = new ec2.SecurityGroup(
      this,
      'product-reviews-db-security-group',
      {
        vpc,
      },
    );

    securityGroup.addIngressRule(
      ec2.Peer.ipv4(process.env.LOCAL_IP_ADDRESS || ''),
      ec2.Port.tcp(5432), // Assuming PostgreSQL. Adjust the port if using a different database engine.
      'Allow inbound traffic from my IP address on port 5432',
    );
    return securityGroup;
  }

  private configureRdsDatabase(
    vpc: cdk.aws_ec2.Vpc,
    securityGroup: cdk.aws_ec2.SecurityGroup,
  ) {
    return new rds.DatabaseInstance(this, 'DB', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_13,
      }),
      publiclyAccessible: true,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T4G,
        ec2.InstanceSize.MEDIUM,
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroups: [securityGroup],
    });
  }

  private configureUserPool() {
    const userPool = new cognito.UserPool(this, 'product-reviews-user-pool', {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
      autoVerify: { email: true },
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    });

    const userPoolClient = new cognito.UserPoolClient(
      this,
      'product-reviews-user-pool-client',
      { userPool },
    );
    return { userPool, userPoolClient };
  }

  private configureGraphQlApi(userPool: cdk.aws_cognito.UserPool) {
    return new appsync.GraphqlApi(this, 'product-reviews-api', {
      name: 'api-to-process-product-reviews',
      schema: appsync.SchemaFile.fromAsset('schema/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
    });
  }

  private configureProductReviewsLambda(
    vpc: cdk.aws_ec2.Vpc,
    securityGroup: cdk.aws_ec2.SecurityGroup,
    db: cdk.aws_rds.DatabaseInstance,
    api: cdk.aws_appsync.GraphqlApi,
  ) {
    const productReviewsLambda = new lambda.Function(
      this,
      'product-reviews-lambda',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: 'main.handler',
        vpc: vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        securityGroups: [securityGroup],
        code: lambda.Code.fromAsset('lambda-fns/product-reviews'),
        memorySize: 1024,
        timeout: cdk.Duration.minutes(5),
      },
    );

    db.connections.allowFrom(securityGroup, ec2.Port.tcp(5432));

    productReviewsLambda.addEnvironment(
      'DATABASE_URL',
      process.env.DATABASE_URL || '',
    );

    const productReviewsLambdaDs = api.addLambdaDataSource(
      'lambdaDatasource',
      productReviewsLambda,
    );

    const userQueriesLambda = new lambda.Function(
      this,
      'product-reviews-lambda-user-queries',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: 'main.handler',
        vpc: vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        securityGroups: [securityGroup],
        code: lambda.Code.fromAsset('lambda-fns/user-queries'),
        memorySize: 1024,
        timeout: cdk.Duration.minutes(5),
      },
    );
    return { userQueriesLambda, productReviewsLambdaDs };
  }

  private configureUserQueriesLambda(
    userQueriesLambda: cdk.aws_lambda.Function,
    userPool: cdk.aws_cognito.UserPool,
    api: cdk.aws_appsync.GraphqlApi,
  ) {
    const userPoolArn = `arn:aws:cognito-idp:${this.region}:${this.account}:userpool/${userPool.userPoolId}`;

    userQueriesLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['cognito-idp:ListUsers'],
        resources: [userPoolArn],
      }),
    );

    userQueriesLambda.addEnvironment('USER_POOL_ID', userPool.userPoolId);

    const userQueriesLambdaDs = api.addLambdaDataSource(
      'userQueriesLambaDatasource',
      userQueriesLambda,
    );
    return userQueriesLambdaDs;
  }

  private configureGraphQlResolvers(
    productReviewsLambdaDs: cdk.aws_appsync.LambdaDataSource,
    userQueriesLambdaDs: cdk.aws_appsync.LambdaDataSource,
  ) {
    const mutations = [
      'createProduct',
      'createFeedbackCategory',
      'createFeedbackStatus',
      'createFeedback',
      'createFeedbackComment',
      'createFeedbackCommentReply',
      'createFeedbackUpvote',
      'deleteFeedbackUpvote',
    ];
    const queries = [
      'getAllProducts',
      'getAllFeedbacksByProductId',
      'getAllFeedbackStatuses',
      'getAllFeedbackCategories',
    ];

    mutations.forEach((mutation) => {
      productReviewsLambdaDs.createResolver(`${mutation}Resolver`, {
        typeName: 'Mutation',
        fieldName: mutation,
      });
    });

    queries.forEach((query) => {
      productReviewsLambdaDs.createResolver(`${query}Resolver`, {
        typeName: 'Query',
        fieldName: query,
      });
    });

    userQueriesLambdaDs.createResolver('getUserInformationByIdResolver', {
      typeName: 'Query',
      fieldName: 'getUserInformationById',
    });
  }

  private configureFrontendHosting() {
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: 'product-reviews-site-bucket',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('frontend/dist')],
      destinationBucket: siteBucket,
    });

    const cloudfrontDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'SiteDistribution',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    );

    return {
      siteBucket,
      cloudfrontDistribution,
    };
  }

  private logStuff(
    api: cdk.aws_appsync.GraphqlApi,
    userPool: cdk.aws_cognito.UserPool,
    userPoolClient: cdk.aws_cognito.UserPoolClient,
    db: cdk.aws_rds.DatabaseInstance,
    siteBucket: cdk.aws_s3.Bucket,
    cloudfrontDistribution: cdk.aws_cloudfront.CloudFrontWebDistribution,
  ) {
    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, 'Stack Region', {
      value: this.region,
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'DBHost', { value: db.dbInstanceEndpointAddress });

    new cdk.CfnOutput(this, 'S3 Bucket site url', {
      value: siteBucket.bucketWebsiteUrl,
    });

    new cdk.CfnOutput(this, 'Cloudfrount distribution site url', {
      value: cloudfrontDistribution.distributionDomainName,
    });
  }
}
