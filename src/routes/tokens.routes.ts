import express, { Request, Response } from "express";
import cors from "cors";
import * as Joi from "joi";
import passport from "passport";

import { privateCorsConfig } from "../util/corsOptions";
import { routeValidation } from "../util/routeValidation";
import { generateJWT } from "../services/tokens.service";

export const tokenRouter = express.Router();

tokenRouter.post(
  "/token/generate",
  cors(privateCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  ),
  generateJWT
);
