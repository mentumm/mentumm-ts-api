import express, { Request, Response } from "express";
import {
  bookCoach,
  deactivateUser,
  newUser,
  registerNewUser,
  updateUserInfo,
  userLogin,
  users,
  upcoming,
  past,
  forgotPassword,
  resetPassword,
} from "../controllers/users.controller";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import { routeValidation } from "../util/routeValidation";
import * as Joi from "joi";
import { CreateUser, RegisterUser, User } from "../models/users.model";
import passport from "passport";

const usersRouter = express.Router();

usersRouter.get(
  "/users",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      email: Joi.string(),
      employer_id: Joi.string(),
      limit: Joi.number(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await users(req, res)
);

usersRouter.get(
  "/user/upcoming",
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
  async (req: Request, res: Response) => await upcoming(req, res)
);

usersRouter.get(
  "/user/past",
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
  async (req: Request, res: Response) => await past(req, res)
);

usersRouter.post(
  "/user/book-coach",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      user_id: Joi.string().required(),
      coach_id: Joi.string().required(),
      invitee_email: Joi.string(),
      invitee_full_name: Joi.string(),
      invitee_uuid: Joi.string(),
      event_end_time: Joi.date(),
      event_start_time: Joi.date(),
      event_type_name: Joi.string(),
      event_type_uuid: Joi.string(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await bookCoach(req, res)
);

// this route is only used from ReTool
usersRouter.post(
  "/user",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object<CreateUser>({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      employer_id: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await newUser(req, res)
);

usersRouter.post(
  "/user/register",
  cors(publicCorsConfig),
  // temporarily disabled until register auth is fixed on front end
  // passport.authenticate("jwt", {
  //   session: false,
  // }),
  routeValidation(
    Joi.object<RegisterUser>({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      invite_code: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await registerNewUser(req, res)
);

usersRouter.delete(
  "/user",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object<{ id: string }>({
      id: Joi.string().required(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await deactivateUser(req, res)
);

usersRouter.put(
  "/user",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object<User>({
      id: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string(),
      city: Joi.string().allow(""),
      state: Joi.string().allow(""),
      bio: Joi.string(),
      photo_url: Joi.string(),
      booking_url: Joi.string(),
      linkedin_url: Joi.string().allow(""),
      phone_number: Joi.string().allow(""),
      facebook_url: Joi.string().allow(""),
      instagram_url: Joi.string().allow(""),
      website_url: Joi.string().allow(""),
      achievements: Joi.string(),
      hobbies: Joi.string(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await updateUserInfo(req, res)
);

usersRouter.post(
  "/user/login",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object<User>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await userLogin(req, res)
);

usersRouter.post(
  "/user/forgot-password",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      email: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await forgotPassword(req, res)
);

usersRouter.post(
  "/user/reset-password",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      reset_password_token: Joi.string().required(),
      password: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await resetPassword(req, res)
);

export default usersRouter;
