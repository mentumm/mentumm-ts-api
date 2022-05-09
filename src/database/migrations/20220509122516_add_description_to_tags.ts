import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("tags", (t) => {
    t.text("description").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("tags", (t) => {
    t.dropColumn("description");
  });
}
