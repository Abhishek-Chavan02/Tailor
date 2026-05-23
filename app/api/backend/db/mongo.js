import mongoose from "mongoose";
import { env, assertMongoConfigured } from "../env/env";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    assertMongoConfigured();

    const opts = {
      bufferCommands: false,
      dbName: env.mongoDbName,
    };

    console.log("Connecting to MongoDB at:", env.mongoUri);
    console.log("Database name:", env.mongoDbName);
    
    cached.promise = mongoose.connect(env.mongoUri, opts).then((mongoose) => {
      console.log("Connected to MongoDB successfully");
      console.log("Database:", mongoose.connection.name);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export async function getDb() {
  await connectDB();
  return mongoose.connection.db;
}