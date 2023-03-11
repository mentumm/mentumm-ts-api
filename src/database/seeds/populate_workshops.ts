import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("workshops").del();

  // Inserts seed entries
  await knex("workshops").insert([
    {
      id: 1,
      name: "Keeping Your Team Highly Engaged",
      month: 3,
      year: 2023,
      vimeo_id: 805733679,
      workbook_url:
        "https://mentumm.com/wp-content/uploads/2023/03/Coaching-Conversations_Participant-Version.pdf",
      hidden: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
