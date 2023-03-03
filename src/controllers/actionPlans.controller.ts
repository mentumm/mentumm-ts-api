import { Request, Response } from "express";
import { createActionPlan } from "../services/actionPlans.service";

export const create = async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  try {
    const actionPlan = await createActionPlan({
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
    });
    if (!actionPlan) {
      return res.status(400).json("Could not create Action Plan");
    }
    return res.status(201).json(actionPlan);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
