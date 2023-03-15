import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function up(knex: Knex): Promise<void> {
  const coaches = await knex("coaches").select("*").returning("*");

  const password = await bcrypt.hash("SAvoin#(8SAnfk2", 10);

  return await knex("users").insert(
    coaches.map((coach) => {
      const { bio, photo_url, booking_link, linkedin_url, location, name, id } =
        coach;
      const first_name = name ? name.split(" ")[0] : "";
      const last_name = name ? name.split(" ")[1] : "";
      return {
        first_name,
        last_name,
        employer_id: null,
        bio,
        photo_url,
        booking_url: booking_link,
        linkedin_url,
        location,
        role: "coach",
        password,
        legacy_coach_id: id,
      };
    })
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex("users").select("*").update({
    bio: null,
    photo_url: null,
    booking_url: null,
    linkedin_url: null,
    location: null,
  });
}
