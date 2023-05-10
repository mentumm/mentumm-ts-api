import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workshops", (t) => {
    t.dropColumn("month");
    t.dropColumn("year");
    t.string("thumbnail_url", 2083);
    t.string("slug");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("workshops", (t) => {
    t.string("year");
    t.string("month");
    t.dropColumn("thumbnail_url");
    t.dropColumn("slug");
  });
}
