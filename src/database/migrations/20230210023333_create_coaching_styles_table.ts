import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("styles", (t) => {
    t.bigIncrements("id");
    t.string("name");
    t.string("slug");
    t.string("description");
    t.string("color");
    t.string("icon");
    t.timestamps(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("coaching_styles");
}
