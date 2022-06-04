import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("user_coaches", (t) => {
    t.string("event_type_uuid", 256);
    t.string("event_type_name", 256);
    t.string("event_start_time", 256);
    t.string("event_end_time", 256);
    t.string("invitee_uuid", 256).unique();
    t.string("invitee_full_name", 256);
    t.string("invitee_email", 256);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("user_coaches", (t) => {
    t.dropColumn("event_type_uuid");
    t.dropColumn("event_type_name");
    t.dropColumn("event_start_time");
    t.dropColumn("event_end_time");
    t.dropColumn("invitee_uuid");
    t.dropColumn("invitee_full_name");
    t.dropColumn("invitee_email");
  });
}
