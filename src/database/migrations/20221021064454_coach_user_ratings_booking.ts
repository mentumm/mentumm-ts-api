import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coach_user_ratings", (t) => {
    t.integer("user_coach_id").nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("coach_user_ratings", (t) => {
    t.dropColumn("user_coach_id");
  });
}

