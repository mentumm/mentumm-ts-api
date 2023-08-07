import { Knex } from "knex";
import { User } from "../../models/users.model";

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async trx => {
    const users: User[] = await trx('Users').select('id', 'achievements', 'hobbies');

    for (const user of users) {
      const updateData: Partial<User> = {};

      if (user.achievements) {
        const achievementsArray = JSON.parse(user.achievements);
        const filteredAchievements = achievementsArray.filter((item: string) => item.trim() !== "");
        updateData.achievements = JSON.stringify(filteredAchievements);
      }

      if (user.hobbies) {
        const hobbiesArray = JSON.parse(user.hobbies);
        const filteredHobbies = hobbiesArray.filter((item: string) => item.trim() !== "");
        updateData.hobbies = JSON.stringify(filteredHobbies);
      }

      if (Object.keys(updateData).length > 0) {  // Checking if there's something to update
        await trx('Users')
          .where('id', user.id)
          .update(updateData);
      }
    }
  });
}


export async function down(knex: Knex): Promise<void> {
  // rollback not recommended, leaving this empty.
  return Promise.resolve();
}

