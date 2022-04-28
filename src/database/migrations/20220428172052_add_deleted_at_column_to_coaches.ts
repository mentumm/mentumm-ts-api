import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coaches", (t) => {
    t.timestamp("deleted_at").defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coaches", (t) => {
    t.dropColumn("deleted_at");
  });
}
