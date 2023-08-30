import express, { Request, Response } from "express";
import cors from "cors";
import * as Joi from "joi";
import passport from "passport";
import { publicCorsConfig } from "../util/corsOptions";
import {
  addCoachRating,
  coaches,
  deactivateCoach,
  newCoach,
  updateCoachInfo,
} from "../controllers/coaches.controller";
import { routeValidation } from "../util/routeValidation";

const coachesRouter = express.Router();

coachesRouter.get(
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
  async (req: Request, res: Response) => await coaches(req, res)
);

coachesRouter.post(
  "/coach",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      booking_url: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await newCoach(req, res)
);

coachesRouter.delete(
  "/coach",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await deactivateCoach(req, res)
);

coachesRouter.put(
  "/coach",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      bio: Joi.string().required(),
      photo_url: Joi.string().required(),
      booking_url: Joi.string().required(),
      linkedin_url: Joi.string().required(),
      location: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await updateCoachInfo(req, res)
);

coachesRouter.post(
  "/coach/rating",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      user_id: Joi.string().required(),
      coach_id: Joi.string().required(),
      rating_overall: Joi.number().required(),
      rating_listening: Joi.number().required(),
      additional_comments: Joi.string(),
      primary_topic: Joi.string().required(),
      user_learned: Joi.boolean().required(),
      user_would_book_again: Joi.boolean().required(),
      user_coach_id: Joi.string(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await addCoachRating(req, res)
);

coachesRouter.post(
  "/coach/register",
  cors(publicCorsConfig),
  // passport.authenticate("jwt", {
  //   session: false,
  // }),
  routeValidation(
    Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      invite_code: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => {
    return await newCoach(req, res)
  }
);

export default coachesRouter;
