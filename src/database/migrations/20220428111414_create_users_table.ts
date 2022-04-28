import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("users", (t) => {
    t.bigIncrements("id");
    t.string("name");
    t.string("email");
    t.bigInteger("employer_id");
    t.foreign("employer_id").references("id").inTable("employers");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("users");
}
