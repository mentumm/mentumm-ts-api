import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.string("role").defaultTo("user");
    t.string("state").nullable();
    t.string("city").nullable();
    t.string("location").nullable();
    t.string("linkedin_url").nullable();
    t.string("booking_url").nullable();
    t.string("photo_url").nullable();
    t.text("bio").nullable();
    t.integer("legacy_coach_id").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("role");
    t.dropColumn("state");
    t.dropColumn("city");
    t.dropColumn("location");
    t.dropColumn("linkedin_url");
    t.dropColumn("booking_url");
    t.dropColumn("photo_url");
    t.dropColumn("bio");
  });
}
