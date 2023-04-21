import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("coach_tags", (t) => {
    t.dropForeign("tag_id");
    t.renameColumn("coach_id", "user_id");
  });

  await knex.schema.renameTable("coach_tags", "user_tag");

  await knex.schema.alterTable("user_tag", (t) => {
    t.foreign("user_id").references("id").inTable("users");
    t.foreign("tag_id").references("id").inTable("tags");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user_tag", (t) => {
    t.dropForeign("user_id");
    t.dropForeign("tag_id");
  });

  await knex.schema.alterTable("user_tag", (t) => {
    t.renameColumn("user_id", "coach_id");
  });

  await knex.schema.renameTable("user_tag", "coach_tags");

  await knex.schema.alterTable("coach_tags", (t) => {
    t.foreign("tag_id").references("id").inTable("tags");
  });
}
