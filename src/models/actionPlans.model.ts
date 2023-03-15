import db from "../database/db";
import { Knex } from "knex";

export interface ActionPlan {
  action_plan_id?: string | number;
  user_id: string | number;
  personal_rank: number;
  professional_rank: number;
  health_wellness_rank: number;
  work_life_balance_rank: number;
  motivation_rank: number;
  relationships_rank: number;
  personal_issues_field: string;
  professional_issues_field: string;
  decisions_field: string;
  leadership_process_field: string;
  key_action_items: string;
}

export interface ActionPlanRecord extends ActionPlan {
  id: string | number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export const actionPlanDataAccess = {
  table: "action_plans",

  async fetchActionPlansByUserId(
    user_id: string | number,
    date?: string
  ): Promise<ActionPlanRecord[]> {
    const actionPlans = await db(this.table)
      .select()
      .where({ user_id })
      .whereNull("deleted_at")
      .modify((qb: Knex.QueryBuilder) => {
        if (date) {
          qb.whereRaw(`created_at >= date_trunc('month', timestamp '${date}')`);
          qb.whereRaw(
            `created_at < date_trunc('month', timestamp '${date}') + interval '1 month'`
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    return actionPlans.map((actionPlan: ActionPlan) => {
      return {
        ...actionPlan,
        key_action_items: JSON.parse(actionPlan.key_action_items),
      };
    });
  },

  async saveNewActionPlan({
    user_id,
    personal_rank,
    professional_rank,
    health_wellness_rank,
    work_life_balance_rank,
    motivation_rank,
    relationships_rank,
    personal_issues_field,
    professional_issues_field,
    decisions_field,
    leadership_process_field,
    key_action_items,
  }: ActionPlan): Promise<ActionPlanRecord> {
    const actionPlan = await db(this.table)
      .insert({
        user_id,
        personal_rank,
        professional_rank,
        health_wellness_rank,
        work_life_balance_rank,
        motivation_rank,
        relationships_rank,
        personal_issues_field,
        professional_issues_field,
        decisions_field,
        leadership_process_field,
        key_action_items: JSON.stringify(key_action_items),
      })
      .returning("*")
      .catch((err) => {
        throw new Error(err);
      });

    return actionPlan[0];
  },

  async updateActionPlan({
    action_plan_id,
    user_id,
    personal_rank,
    professional_rank,
    health_wellness_rank,
    work_life_balance_rank,
    motivation_rank,
    relationships_rank,
    personal_issues_field,
    professional_issues_field,
    decisions_field,
    leadership_process_field,
    key_action_items,
  }: ActionPlan): Promise<ActionPlanRecord> {
    const actionPlan = await db(this.table)
      .update({
        user_id,
        personal_rank,
        professional_rank,
        health_wellness_rank,
        work_life_balance_rank,
        motivation_rank,
        relationships_rank,
        personal_issues_field,
        professional_issues_field,
        decisions_field,
        leadership_process_field,
        key_action_items: JSON.stringify(key_action_items),
      })
      .where({ id: action_plan_id })
      .returning("*")
      .catch((err) => {
        throw new Error(err);
      });

    return actionPlan[0];
  },

  async deleteActionPlan(action_plan_id: string): Promise<ActionPlanRecord[]> {
    return await db(this.table)
      .update({ deleted_at: new Date() })
      .where({ id: action_plan_id })
      .returning("*")
      .catch((err) => {
        throw new Error(err);
      });
  },
};
