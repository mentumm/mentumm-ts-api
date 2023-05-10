import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.renameTable("user_style_type", "coaches_style_types");

  await knex.schema.alterTable("coaches_style_types", (t) => {
    t.dropForeign("user_id");
    t.dropForeign("style_type_id");
  });

  await knex.schema.dropTable("coaches_style_types");

  await knex.schema.dropTable("style_types");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable("style_types", (t) => {
    t.bigIncrements("id");
    t.string("name");
    t.string("slug");
    t.string("description");
    t.string("color");
    t.string("icon");
    t.timestamps(true);
  });

  return await knex.schema.createTable("user_style_type", (t) => {
    t.bigIncrements("id");
    t.bigInteger("user_id");
    t.bigInteger("style_type_id");
    t.timestamps(true);
    t.foreign("user_id").references("id").inTable("users");
    t.foreign("style_type_id").references("id").inTable("style_types");
  });
}
