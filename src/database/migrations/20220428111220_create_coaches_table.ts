import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("coaches", (t) => {
    t.bigIncrements("id");
    t.string("name");
    t.text("bio");
    t.string("photo_url");
    t.string("booking_link");
    t.string("linkedin_url");
    t.string("location");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("coaches");
}
