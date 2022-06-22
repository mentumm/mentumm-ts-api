// was unable to read .env since this was nested ?_?, unsure why that is
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

import { Knex } from "knex";

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

  production: {
    client: "pg",
    connection: DB + "?ssl=true",
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    pool: { min: 0, max: 7 },
    acquireConnectionTimeout: 600000,
  },
};

export default configs;
