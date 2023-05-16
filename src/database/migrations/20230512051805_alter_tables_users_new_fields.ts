import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.string("phone_number");
    t.string("instagram_url");
    t.string("facebook_url");
    t.string("website_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("phone_number");
    t.dropColumn("instagram_url");
    t.dropColumn("facebook_url");
    t.dropColumn("website_url");
  });
}
