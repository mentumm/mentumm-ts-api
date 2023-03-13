import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("action_plans", (t) => {
    t.bigIncrements("id").primary();
    t.bigInteger("user_id").index().notNullable();
    t.integer("personal_rank").notNullable();
    t.integer("professional_rank").notNullable();
    t.integer("health_wellness_rank").notNullable();
    t.integer("work_life_balance_rank").notNullable();
    t.integer("motivation_rank").notNullable();
    t.integer("relationships_rank").notNullable();
    t.string("personal_issues_field", 2000).nullable();
    t.string("professional_issues_field", 2000).nullable();
    t.string("decisions_field", 2000).nullable();
    t.string("leadership_process_field", 2000).nullable();
    t.string("key_action_items").nullable();
    t.timestamps(true, true);
    t.timestamp("deleted_at").nullable();
    t.foreign("user_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("action_plans");
}
