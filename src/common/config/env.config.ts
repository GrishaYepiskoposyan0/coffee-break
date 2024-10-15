import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  // App
  PORT: +getEnv("PORT") || 3000,
};

function getEnv(name: string): string {
  const val: string | undefined = process.env[name];
  if (val === undefined || val === null) {
    throw new Error(`Missing env var for ${name}`);
  }
  return val.trim();
}
