# mentumm API

API that powers that good good

## Installation

Install with yarn

```bash
  yarn install
  yarn dev
```

## Setting up a local database

If you're running this locally for the first time and want a fresh database, make sure you create your database manually.

login to postgres

```
  sudo -u postgres psql
```

once logged in to psql

```
  CREATE DATABASE growth10;
```

Once database is created, exit psql and run the migrations to create the tables

```
  yarn db:migrate
```

## Migrations

Since our `knexfile.ts` is in our database folder, we need to run migrations with this command

```
  yarn knex migrate:make migration_name
```
