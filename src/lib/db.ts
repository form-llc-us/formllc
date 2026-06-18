import mysql from "mysql2/promise";
import { env, logMissing } from "./env";

let globalPool: mysql.Pool | null = null;
let usPool: mysql.Pool | null = null;

export function getPool(region: "global" | "us" = "global"): mysql.Pool | null {
  if (region === "us") {
    if (usPool) return usPool;
    if (!env.usDb.name || !env.usDb.user) {
      logMissing("db.us", "US_DB_NAME/US_DB_USER");
      return null;
    }
    usPool = mysql.createPool({
      host: env.usDb.host,
      port: env.usDb.port,
      database: env.usDb.name,
      user: env.usDb.user,
      password: env.usDb.pass,
      waitForConnections: true,
      connectionLimit: 5,
      charset: "utf8mb4",
    });
    return usPool;
  }

  if (globalPool) return globalPool;
  if (!env.db.name || !env.db.user) {
    logMissing("db.global", "DB_NAME/DB_USER");
    return null;
  }
  globalPool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    database: env.db.name,
    user: env.db.user,
    password: env.db.pass,
    waitForConnections: true,
    connectionLimit: 5,
    charset: "utf8mb4",
  });
  return globalPool;
}
