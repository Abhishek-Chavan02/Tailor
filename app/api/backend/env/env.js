function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017",
  mongoDbName: process.env.MONGODB_DB ?? "Tailor",


  jwtSecret: process.env.JWT_SECRET ?? null,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",

  adminEmail: process.env.ADMIN_EMAIL ?? null,
  adminName: process.env.ADMIN_NAME ?? "Admin",
  adminPassword: process.env.ADMIN_PASSWORD ?? null,
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH ?? null,
};

export function assertAuthEnvConfigured() {
  required("JWT_SECRET");
}

export function assertMongoConfigured() {
  required("MONGODB_URI");
  required("MONGODB_DB");
}

