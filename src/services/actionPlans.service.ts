import {
  ActionPlan,
  actionPlanDataAccess,
  ActionPlanRecord,
} from "../models/actionPlans.model";

export const createActionPlan = async (
  actionPlanValues: ActionPlan
): Promise<ActionPlanRecord> => {
  return await actionPlanDataAccess.saveNewActionPlan({
    ...actionPlanValues,
  });
};

export const getAllActionPlansByUserId = async (user_id: string | number) => {
  return await actionPlanDataAccess.fetchActionPlansByUserId(user_id);
};

export const getActionPlanByUserIdAndDate = async (
  user_id: string | number,
  date: string
) => {
  return await actionPlanDataAccess.fetchActionPlansByUserId(user_id, date);
};

export const updateExistingActionPlan = async (
  actionPlanValues: ActionPlan
) => {
  return await actionPlanDataAccess.updateActionPlan(actionPlanValues);
};

export const deleteActionPlan = async (actionPlanId: string) => {
  return await actionPlanDataAccess.deleteActionPlan(actionPlanId);
};
