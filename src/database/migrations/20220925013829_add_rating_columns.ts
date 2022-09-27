import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coach_user_ratings", (t) => {
    t.integer("rating_overall");
    t.integer("rating_listening");
    t.dropColumn("overall_rating");
    t.dropColumn("listening_rating");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coach_user_ratings", (t) => {
    t.dropColumn("rating_overall");
    t.dropColumn("rating_listening");
    t.integer("overall_rating");
    t.integer("listening_rating");
  });
}
