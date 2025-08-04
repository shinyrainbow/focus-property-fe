import { Amplify } from "aws-amplify"

const awsConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || "your-user-pool-id",
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID || "your-web-client-id",
      loginWith: {
        email: true,
        username: true,
      },
    },
    mandatorySignIn: false,
    cookieStorage: {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost",
      path: "/",
      expires: 365,
      secure: process.env.NODE_ENV === "production",
    },
  },
}

Amplify.configure(awsConfig)

export default awsConfig
