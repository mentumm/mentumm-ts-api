require("dotenv").config();
import { Knex } from "knex";

const NODE_ENV = process.env.NODE_ENV;
// const DB = process.env.DATABASE_URL;
// const DB = "postgres://denvermullets:postgres@localhost:5432/growth10";
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

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

export default configs;
