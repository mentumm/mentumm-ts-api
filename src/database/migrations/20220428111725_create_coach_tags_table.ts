import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("coach_tags", (t) => {
    t.bigIncrements("id");
    t.bigInteger("coach_id");
    t.foreign("coach_id").references("id").inTable("coaches");
    t.bigInteger("tag_id");
    t.foreign("tag_id").references("id").inTable("tags");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("coach_tags");
}
