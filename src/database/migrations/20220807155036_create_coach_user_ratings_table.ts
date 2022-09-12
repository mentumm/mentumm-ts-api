import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("coach_user_ratings", (t) => {
    t.bigIncrements("id");
    t.tinyint("overall_rating_exp");
    t.tinyint("listening_rating");
    t.text("additional_comments");
    t.string("primary_topic");
    t.boolean("user_learned");
    t.boolean("user_would_book_again");
    t.bigInteger("coach_id");
    t.foreign("coach_id").references("id").inTable("coaches");
    t.bigInteger("user_id");
    t.foreign("user_id").references("id").inTable("users");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("coach_user_ratings");
}
