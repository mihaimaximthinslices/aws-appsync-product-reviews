import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { config } from 'dotenv';

config();

export class AwsAppsyncStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC');

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

    const db = new rds.DatabaseInstance(this, 'DB', {
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

    const api = new appsync.GraphqlApi(this, 'product-reviews-api', {
      name: 'api-to-process-product-reviews',
      schema: appsync.SchemaFile.fromAsset('schema/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool,
            },
          },
        ],
      },
    });

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
        code: lambda.Code.fromAsset('lambda-fns'),
        memorySize: 1024,
      },
    );

    productReviewsLambda.addEnvironment(
      'DB_HOST',
      db.dbInstanceEndpointAddress,
    );
    productReviewsLambda.addEnvironment('DB_PORT', db.dbInstanceEndpointPort);
    productReviewsLambda.addEnvironment(
      'DB_HOST',
      db.instanceEndpoint.hostname,
    );
    console.log(
      'DB_ENV_VARS',
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
    );

    productReviewsLambda.addEnvironment(
      'DB_USERNAME',
      process.env.DB_USERNAME || '',
    );
    productReviewsLambda.addEnvironment(
      'DB_PASSWORD',
      process.env.DB_PASSWORD || '',
    );

    const lambdaDs = api.addLambdaDataSource(
      'lambdaDatasource',
      productReviewsLambda,
    );

    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || '',
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

    lambdaDs.createResolver('createProductResolver', {
      typeName: 'Mutation',
      fieldName: 'createProduct',
    });

    lambdaDs.createResolver('createFeedbackCategoryResolver', {
      typeName: 'Mutation',
      fieldName: 'createFeedbackCategory',
    });

    lambdaDs.createResolver('createFeedbackStatusResolver', {
      typeName: 'Mutation',
      fieldName: 'createFeedbackStatus',
    });

    lambdaDs.createResolver('createFeedbackResolver', {
      typeName: 'Mutation',
      fieldName: 'createFeedback',
    });

    lambdaDs.createResolver('getAllProductsResolver', {
      typeName: 'Query',
      fieldName: 'getAllProducts',
    });

    lambdaDs.createResolver('getAllFeedbacksByProductIdResolver', {
      typeName: 'Query',
      fieldName: 'getAllFeedbacksByProductId',
    });
  }
}
