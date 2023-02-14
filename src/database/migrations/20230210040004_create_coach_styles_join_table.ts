import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("coaches_style_types", (t) => {
    t.bigIncrements("id");
    t.bigInteger("coach_id");
    t.bigInteger("style_type_id");
    t.timestamps(true);
    t.foreign("coach_id").references("id").inTable("coaches");
    t.foreign("style_type_id").references("id").inTable("style_types");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("coach_styles");
}
