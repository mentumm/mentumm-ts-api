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
      vimeo_id: 406046632,
      workbook_url:
        "https://drive.google.com/u/0/uc?id=11qUSltFObtud6E38zPUhpjrwEOhZN040&export=download",
      hidden: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
