import { Knex } from "knex";
import { User } from "../../models/users.model";

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async trx => {
    const users: User[] = await trx('users').select('id', 'achievements', 'hobbies');

    for (const user of users) {
      const achievementsArray = user.achievements ? JSON.parse(user.achievements) : [];
      const hobbiesArray = user.hobbies ? JSON.parse(user.hobbies) : [];

      const filteredAchievements = achievementsArray.filter((item: string) => item.trim() !== "");
      const filteredHobbies = hobbiesArray.filter((item: string) => item.trim() !== "");

      await trx('users')
        .where('id', user.id)
        .update({
          achievements: JSON.stringify(filteredAchievements),
          hobbies: JSON.stringify(filteredHobbies),
        });
    }
  });
}


export async function down(knex: Knex): Promise<void> {
  // rollback not recommended, leaving this empty.
  return Promise.resolve();
}

