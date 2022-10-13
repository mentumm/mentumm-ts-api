import { Knex } from "knex";
import db from "../db";


export async function up(knex: Knex): Promise<(number | { message: string; })[]> {
  return await Promise.all([
    db("tags")
      .whereIn('slug', [
        'career-planning',
        'communication',
        'content-development',
        'customer-care',
        'linkedin-marketing',
        'negotiation',
        'networking',
        'presentation-public-speaking',
        'sales',
        'time-management-productivity',
      ])
      .update({ category: 'Professional' })
      .catch((err: Error) => {
        console.log(err);
        return { message: "Unable to update Tags" };
      }),

    db("tags")
    .whereIn('slug', [
      'collaboration',
      'conflict-management',
      'decision-making',
      'interview-skills',
      'leadership',
      'management',
      'mentoring',
      'onboarding-training',
      'problem-solving',
      'relationship-management',
      'strategic-planning',
      'workplace-culture',
    ])
    .update({ category: 'Leadership' })
    .catch((err: Error) => {
      console.log(err);
      return { message: "Unable to update Tags" };
    }),

    db("tags")
    .whereIn('slug', [
      'goal-setting',
      'life-coaching',
      'meditation',
      'nutrition',
      'parenting',
      'personal-branding',
      'personal-finance',
      'personal-fitness',
      'sleep',
      'stress-management',
      'work-life-balance',
    ])
    .update({ category: 'Personal' })
    .catch((err: Error) => {
      console.log(err);
      return { message: "Unable to update Tags" };
    })
  ]);
}


export async function down(knex: Knex): Promise<number | { message: string; }> {
 return await db("tags")
    .update({ category: null })
    .catch((err: Error) => {
      console.log(err);
      return { message: "Unable to update Tags" };
    });
}

