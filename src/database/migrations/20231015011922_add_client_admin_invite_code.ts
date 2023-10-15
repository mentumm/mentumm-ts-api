import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('employers', table => {
    table.string('client_admin_invitation_code').unique().nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('employers', table => {
    table.dropColumn('client_admin_invitation_code');
  });
}

