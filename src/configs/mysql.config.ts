import dotenv from "dotenv";
import mysql, { Pool } from "mysql2";
import { getEnv } from "../utils/getEnv";
dotenv.config();

const config = {
  host: getEnv("DB_HOST"),
  user: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  database: getEnv("DB_DATABASE"),
};
class MySQLConfig {
  public connection: Pool;
  public constructor() {
    try {
      this.connection = mysql.createPool(config);
      console.log("Database created");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  public getConnection(): Pool {
    return this.connection;
  }
}

const mySqlConfig = new MySQLConfig();

export default mySqlConfig;
