import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("tags", (t) => {
    t.string("kind");
    t.string("color");
  });

  await knex.table("tags").update({ kind: "expertise" });

  await knex.raw(
    "INSERT INTO tags (name, slug, description, color, icon, created_at, updated_at, kind) SELECT name, slug, description, color, icon, created_at, updated_at, 'style' as kind FROM style_types"
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("tags", (t) => {
    t.dropColumn("kind");
    t.dropColumn("color");
  });
}
