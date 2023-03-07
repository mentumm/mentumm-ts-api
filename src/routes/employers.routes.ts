import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import {
  deactivateEmployer,
  employers,
  newEmployer,
  updateEmployerInfo,
} from "../controllers/employers.controller";
import { routeValidation } from "../util/routeValidation";
import * as Joi from "joi";

const employersRouter = express.Router();

employersRouter.get(
  "/employers",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      max_employees: Joi.string(),
      invitation_code: Joi.string(),
      limit: Joi.number(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await employers(req, res)
);

employersRouter.post(
  "/employer",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      name: Joi.string().required(),
      max_employees: Joi.string().required(),
      invitation_code: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await newEmployer(req, res)
);

employersRouter.delete(
  "/employer",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await deactivateEmployer(req, res)
);

employersRouter.put(
  "/employer",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      max_employees: Joi.string().required(),
      invitation_code: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await updateEmployerInfo(req, res)
);

export default employersRouter;
