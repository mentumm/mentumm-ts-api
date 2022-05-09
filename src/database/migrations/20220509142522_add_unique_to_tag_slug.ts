import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("tags", (t) => {
    t.unique(["slug"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("employers", (t) => {
    t.dropUnique(["slug"]);
  });
}
