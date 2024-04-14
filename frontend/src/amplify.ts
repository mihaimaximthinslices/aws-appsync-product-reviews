import { ResourcesConfig } from 'aws-amplify';

export const amplifyConfig: ResourcesConfig = {
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_GRAPH_QL_API_URL!,
      region: 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID!,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID!,
    },
  },
};
