import dotenv from "dotenv";
import mysql, { Pool } from "mysql2";
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
