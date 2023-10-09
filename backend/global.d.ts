declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        MONGODB_URI: string;
        // Add other environment variables here if needed
      }
    }
  }
  