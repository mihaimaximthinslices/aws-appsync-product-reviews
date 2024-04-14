import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognito = new CognitoIdentityServiceProvider({});

exports.handler = async (event: any) => {
  const {
    arguments: { data },
  } = event;

  if (event.info.fieldName === 'getUserInformationById') {
    const user = await getUser(data.userId, process.env.USER_POOL_ID || '');
    return {
      id: user.Username,
      email: user.Attributes?.find((attr) => attr.Name === 'email')?.Value,
      status: user.UserStatus,
    };
  }
  return null;
};

async function getUser(userId: string, userPoolId: string) {
  const params = {
    UserPoolId: userPoolId,
    Filter: `sub = "${userId}"`,
  };

  console.log('params', params);

  const response = await cognito.listUsers(params).promise();

  console.log('response', response);
  if (!response || !response.Users) {
    throw new Error(`User with id "${userId}" not found`);
  }
  if (response.Users.length > 0) {
    return response.Users[0];
  } else {
    throw new Error(`User with sub "${userId}" not found`);
  }
}
