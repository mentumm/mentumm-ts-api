import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("name");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.string("name");
  });
}
