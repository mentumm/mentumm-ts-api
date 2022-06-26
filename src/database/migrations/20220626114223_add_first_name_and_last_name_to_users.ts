import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (t) => {
    t.string("first_name", 256);
    t.string("last_name", 256);
  });

  await knex("users")
    .whereNull("deleted_at")
    .then((allUsers) => {
      return allUsers.map(async (user) => {
        // currently all db names are standard
        const splitName = user.name.split(" ");
        const updatedName = await knex("users").where({ id: user.id }).update({
          first_name: splitName[0],
          last_name: splitName[1],
        });

        return updatedName;
      });
    });

  return;
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable("users", (t) => {
    t.dropColumn("first_name");
    t.dropColumn("last_name");
  });
}
