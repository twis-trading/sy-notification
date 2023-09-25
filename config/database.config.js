import { createPool } from "mysql2/promise";

const pool = createPool({
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "dbsenyasv2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).on("error", (err) => {
  console.log("Failed to connect to Database - ", err);
});

export { pool };
