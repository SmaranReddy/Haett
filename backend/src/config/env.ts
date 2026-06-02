import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  port: parseInt(getEnvVar("PORT", "3000"), 10),

  database: {
    url: getEnvVar("DATABASE_URL"),
  },

  jwt: {
    secret: getEnvVar("JWT_SECRET"),
    expiresIn: getEnvVar("JWT_EXPIRES_IN", "7d"),
  },

  adminSeed: {
    name: getEnvVar("ADMIN_SEED_NAME", "Admin"),
    email: getEnvVar("ADMIN_SEED_EMAIL", "admin@example.com"),
    password: getEnvVar("ADMIN_SEED_PASSWORD"),
  },

  userSeed: {
    name: getEnvVar("USER_SEED_NAME", "Test User"),
    email: getEnvVar("USER_SEED_EMAIL", "user@example.com"),
    password: getEnvVar("USER_SEED_PASSWORD"),
  },
} as const;
