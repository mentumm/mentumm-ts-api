import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import { routeValidation } from "../util/routeValidation";
import * as Joi from "joi";
import passport from "passport";
import { clientAdmin, newClientAdmin } from "../controllers/clientAdmin.controller";

const clientAdminRouter = express.Router();

clientAdminRouter.get(
  "/clientAdmins",
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
      await clientAdmin(req, res);
    } catch (error) {
      next(error);
    }
  }
);

clientAdminRouter.post(
  "/clientAdmin",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      is_test: Joi.bool(),
    }),
    "body"
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await newClientAdmin(req, res);
    } catch (error) {
      next(error);
    }
  }
);

clientAdminRouter.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);

  res.status(err.status || 500).send({
    error: {
      message: err.message || 'An error occured when hitting this route',
      data: err.data || {}
    }
  });
});

export default clientAdminRouter