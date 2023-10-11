import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import { routeValidation } from "../util/routeValidation";
import * as Joi from "joi";
import passport from "passport";

const clientAdminRouter = express.Router();

clientAdminRouter.get(
  "/coaches",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      limit: Joi.number(),
      search: Joi.string(),
    }),
    "query"
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await clientAdmins(req, res);
    } catch (error) {
      next(error);
    }
  }
);
