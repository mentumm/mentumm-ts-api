import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.string("password", 256);
    t.string("reset_password_token", 256);
    t.timestamp("reset_password_expiration");
    t.timestamp("last_sign_in");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("password");
    t.dropColumn("reset_password_token");
    t.dropColumn("reset_password_expiration");
    t.dropColumn("last_sign_in");
  });
}
