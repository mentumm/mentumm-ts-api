import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (t) => {
    t.string("first_name").notNullable().alter();
    t.string("last_name").notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (t) => {
    t.string("first_name").nullable().alter();
    t.string("last_name").nullable().alter();
  });
}
