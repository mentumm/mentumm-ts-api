import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tags", (table) => {
    table.text("description").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tags", (table) => {
    table.text("description").notNullable().alter();
  });
}
