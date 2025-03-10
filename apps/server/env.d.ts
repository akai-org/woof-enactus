declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      PORT: number;
      DATABASE_URL: string;
    }
  }
}

export {};
