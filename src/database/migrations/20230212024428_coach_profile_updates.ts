import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coaches", (t) => {
    t.string("instagram_url").nullable();
    t.string("facebook_url").nullable();
    t.string("website_url").nullable();
    t.json("achievements").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coaches", (t) => {
    t.dropColumn("instagram_url");
    t.dropColumn("facebook_url");
    t.dropColumn("website_url");
    t.dropColumn("achievements");
  });
}
