import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    const users = await trx('users').whereNotNull('location');

    for (const user of users) {
      const [city, state] = user.location.split(',').map((s: string) => s.trim());

      await trx('users')
        .where({ id: user.id })
        .update({ city, state });
    }
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    const users = await trx('users').whereNotNull('city').whereNotNull('state');

    for (const user of users) {
      const location = `${user.city}, ${user.state}`;
      await trx('users')
        .where({ id: user.id })
        .update({ location });
    }
  });
}

