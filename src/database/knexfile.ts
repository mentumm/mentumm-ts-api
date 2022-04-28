// was unable to read .env since this was nested ?_?, unsure why that is
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

import { Knex } from "knex";

const NODE_ENV = process.env.NODE_ENV;
const DB = process.env.DATABASE_URL;

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: "pg",
    connection: DB,
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
  },

  // will need to update this for production
  // since the typing doesn't have ssl in it
  // we could try appending '?ssl=true' to the connection string
  //  ssl: {
  //    sslmode: 'require',
  //    rejectUnauthorized: false,
  //  },

  production: {
    client: "pg",
    connection: DB,
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
  },
};

export default configs;
