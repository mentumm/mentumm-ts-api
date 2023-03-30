import express from "express";
import cors from "cors";
import * as Joi from "joi";

import { privateCorsConfig } from "../util/corsOptions";
import { routeValidation } from "../util/routeValidation";
import { generateJWT } from "../services/tokens.service";

export const tokenRouter = express.Router();

tokenRouter.post(
  "/token/generate",
  cors(privateCorsConfig),
  routeValidation(
    Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  ),
  generateJWT
);
