import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("user_coaches", (t) => {
    t.bigIncrements("id");
    t.bigInteger("user_id");
    t.foreign("user_id").references("id").inTable("users");
    t.bigInteger("coach_id");
    t.foreign("coach_id").references("id").inTable("coaches");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("user_coaches");
}
