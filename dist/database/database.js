import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
var Pool = pkg.Pool;
var databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
var connection = new Pool(databaseConfig);
export { connection };
