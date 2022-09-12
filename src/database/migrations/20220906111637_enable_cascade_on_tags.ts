import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("coach_tags", (t) => {
    t.dropForeign("tag_id");
    t.foreign("tag_id")
      .references("tags.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("coach_tags", (t) => {
    t.dropForeign("tag_id");
    t.foreign("tag_id")
      .references("tags.id")
      .onDelete("NO ACTION")
      .onUpdate("NO ACTION");
  });
}
