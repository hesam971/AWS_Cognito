import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: "us-east-2_TF0W6mQ7O",
  ClientId: "3s7j1qonkqealhsuohm6qt86vk",
};
export default new CognitoUserPool(poolData);