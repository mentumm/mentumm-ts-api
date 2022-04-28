import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import {
  deactivateEmployer,
  employers,
  newEmployer,
  updateEmployerInfo,
} from "../controllers/employers.controller";

const employersRouter = express.Router();

employersRouter.get(
  "/employers",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await employers(req, res)
);

employersRouter.post(
  "/employer",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await newEmployer(req, res)
);

employersRouter.delete(
  "/employer",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await deactivateEmployer(req, res)
);

employersRouter.put(
  "/employer",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await updateEmployerInfo(req, res)
);

export default employersRouter;
