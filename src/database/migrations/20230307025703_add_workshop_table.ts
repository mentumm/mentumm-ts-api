import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("workshops", (t) => {
    t.bigIncrements("id");
    t.string("year");
    t.string("month");
    t.string("name");
    t.string("vimeo_id");
    t.string("workbook_url");
    t.tinyint("hidden").defaultTo(1).notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("workshops");
}
