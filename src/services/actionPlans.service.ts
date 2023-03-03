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
