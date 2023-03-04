import { Knex } from "knex";
import _ from "lodash";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("coach_tags", (t) => {
    t.dropForeign("coach_id");
  });

  const coach_tags = await knex("coach_tags").select("*");
  coach_tags.map((coachTag) => {
    const handleUpdate = async () => {
      const legacyId = coachTag.coach_id;
      const newId = await knex("users").where("legacy_coach_id", legacyId);

      await knex("coach_tags")
        .where("coach_id", legacyId)
        .update("coach_id", _.head(newId).id);
    };
    handleUpdate();
  });

  return;
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("coach_tags", (t) => {
    t.dropForeign("coach_id");
  });

  const coach_tags = await knex("coach_tags").select("*");

  coach_tags.map((coachTag) => {
    const handleUpdate = async () => {
      const user = await knex("users").where("id", coachTag.coach_id);

      await knex("coach_tags")
        .where("coach_id", _.head(user).id)
        .update("coach_id", _.head(user).legacy_coach_id);
    };
    handleUpdate();
  });

  return;
}
