import { Knex } from "knex";
import _ from "lodash";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user_coaches", (t) => {
    t.dropForeign("coach_id");
  });

  const user_coaches = await knex("user_coaches").select("*");
  user_coaches.map((userCoach) => {
    const handleUpdate = async () => {
      const legacyId = userCoach.coach_id;
      const newId = await knex("users").where("legacy_coach_id", legacyId);

      await knex("user_coaches")
        .where("coach_id", legacyId)
        .update("coach_id", _.head(newId).id);
    };
    handleUpdate();
  });
}

export async function down(knex: Knex): Promise<void> {}
