import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import { create, getActionPlans } from "../controllers/actionPlans.controller";

const actionPlansRouter = express.Router();

actionPlansRouter.post(
  "/action-plans",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await create(req, res)
);

actionPlansRouter.get(
  "/action-plans/:user_id",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await getActionPlans(req, res)
);

export default actionPlansRouter;
