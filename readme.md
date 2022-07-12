# Growth 10 API

[![wakatime](https://wakatime.com/badge/user/d757e474-7c49-44b9-9222-b7e3547c29c5/project/6bb2dbe8-3795-43be-872f-c6fe3353532d.svg)](https://wakatime.com/badge/user/d757e474-7c49-44b9-9222-b7e3547c29c5/project/6bb2dbe8-3795-43be-872f-c6fe3353532d)

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
