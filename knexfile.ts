// was unable to read .env since this was nested ?_?, unsure why that is
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

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
      directory: "./src/database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: DB + "?ssl=true",
    migrations: {
      directory: ".src/database/migrations",
      tableName: "knex_migrations",
    },
    pool: {
      min: 0,
      max: 7,
      acquireTimeoutMillis: 300000,
      createTimeoutMillis: 300000,
      destroyTimeoutMillis: 50000,
      idleTimeoutMillis: 300000,
      reapIntervalMillis: 10000,
      createRetryIntervalMillis: 2000,
      propagateCreateError: false,
    },
    acquireConnectionTimeout: 600000,
  },
};

export default configs;
