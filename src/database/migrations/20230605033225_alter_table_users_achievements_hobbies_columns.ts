import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.string("achievements", 2500).nullable();
    t.string("hobbies", 2500).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("achievements");
    t.dropColumn("hobbies");
  });
}
