import db from "../database/db";

export interface ActionPlan {
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
  key_action_items: string[];
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
    user_id: string | number
  ): Promise<ActionPlanRecord[]> {
    const actionPlans = await db(this.table)
      .select()
      .where({ user_id })
      .whereNull("deleted_at")
      .catch((err) => {
        throw new Error(err);
      });

    const parsedActionPlans = actionPlans.map((actionPlan) => {
      return {
        ...actionPlan,
        key_action_items: JSON.parse(actionPlan.key_action_items),
      };
    });
    return parsedActionPlans;
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
    console.log({ key_action_items });
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
};
