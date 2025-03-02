declare namespace NodeJS {
  interface IProcessEnv {
    // Port
    readonly PORT: number;
    readonly NODE_ENV: "development | production";
    // MongoUrl
    readonly MONGO_URL: string;
    // BaseUrl
    BASE_URL: string;
    BASE_URL_FRONT: string;
    // Jwt
    readonly JWT_KEY: string;
    readonly JWT_Expire: string;
    readonly JWT_RESET_EXPIRE: string;
    // NodeMailer
    readonly EMAIL_HOST: string;
    readonly EMAIL_USERNAME: string;
    readonly EMAIL_PASSWORD: string;
    readonly APP_NAME: string;
    // Google
    readonly KEY: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
  }
}
