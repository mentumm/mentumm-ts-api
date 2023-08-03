import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.boolean("is_test").defaultTo(false).nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("is_test");
  });
}

