import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("coach_styles", (t) => {
    t.bigIncrements("id");
    t.bigInteger("coach_id");
    t.bigInteger("style_id");
    t.timestamps(true);
    t.foreign("coach_id").references("id").inTable("coaches");
    t.foreign("style_id").references("id").inTable("styles");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("coach_styles");
}
