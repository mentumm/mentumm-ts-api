import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import {
  addCoachRating,
  coaches,
  deactivateCoach,
  newCoach,
  updateCoachInfo,
} from "../controllers/coaches.controller";

const coachesRouter = express.Router();

coachesRouter.get(
  "/coaches",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await coaches(req, res)
);

coachesRouter.post(
  "/coach",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await newCoach(req, res)
);

coachesRouter.delete(
  "/coach",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await deactivateCoach(req, res)
);

coachesRouter.put(
  "/coach",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await updateCoachInfo(req, res)
);

coachesRouter.post(
  "/coach/rating",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await addCoachRating(req, res)
);

export default coachesRouter;
