import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("employers", (t) => {
    t.unique(["name"]);
    t.unique(["invitation_code"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("employers", (t) => {
    t.dropUnique(["name"]);
    t.dropUnique(["invitation_code"]);
  });
}
