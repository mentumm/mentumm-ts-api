import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("employers").del();

  await knex("employers").insert([
    {
      id: 1,
      name: "Big Name Employer",
      max_employees: 99,
      invitation_code: "code",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
