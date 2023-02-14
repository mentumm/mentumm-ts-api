import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("style_types").del();

  // Inserts seed entries
  await knex("style_types").insert([
    {
      id: 1,
      name: "Challenger",
      slug: "challenger",
      description: "Motivate + Inspire",
      color: "#84B0F9",
      icon: "fa-solid fa-rocket",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Educator",
      slug: "educator",
      description: "Teach + Train",
      color: "#5DBABD",
      icon: "fa-solid fa-hat-wizard",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Sponsor",
      slug: "sponsor",
      description: "Advocate + Connect",
      color: "#DAC9FF",
      icon: "fa-solid fa-seedling",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Anchor",
      slug: "anchor",
      description: "Listen + Empathize",
      color: "#8ED6F4",
      icon: "fa-solid fa-anchor",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Ideator",
      slug: "ideator",
      description: "Brainstorm + Strategize",
      color: "#F99883",
      icon: "fa-solid fa-lightbulb",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Cheerleader",
      slug: "cheerleader",
      description: "Energize + Reinforce",
      color: "#FF8888",
      icon: "fa-solid fa-fire-flame-curved",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      name: "Protector",
      slug: "protector",
      description: "Support + Protect",
      color: "#93E1E5",
      icon: "fa-solid fa-chess-king",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
