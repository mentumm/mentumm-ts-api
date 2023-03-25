import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("coaches_style_types", (t) => {
    t.dropForeign("coach_id");
    t.renameColumn("coach_id", "user_id");
    t.foreign("user_id").references("id").inTable("users");
  });

  await knex.schema.renameTable("coaches_style_types", "user_style_type");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.renameTable("user_style_type", "coaches_style_types");

  await knex.schema.alterTable("coaches_style_types", (t) => {
    t.dropForeign("user_id");
    t.renameColumn("user_id", "coach_id");
    t.foreign("coach_id").references("id").inTable("users");
  });
}
