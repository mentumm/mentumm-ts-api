import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("tags", (t) => {
    t.bigIncrements("id");
    t.string("name");
    t.string("slug");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("tags");
}
