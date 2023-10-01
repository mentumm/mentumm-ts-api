/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await users(req, res);
    } catch (error) {
      next(error)
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await upcoming(req, res);
    } catch (error) {
      next(error)
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await past(req, res);
    } catch (error) {
      next(error);
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await bookCoach(req, res);
    } catch (error) {
      next(error);
    }
  }
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
      is_test: Joi.bool(),
    }),
    "body"
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await newUser(req, res);
    } catch (error) {
      next(error);
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerNewUser(req, res);
    } catch (error) {
      next(error);
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deactivateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
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
      is_test: Joi.bool(),
    }),
    "body"
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUserInfo(req, res);
    } catch (error) {
      next(error);
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await forgotPassword(req, res);
    } catch (error) {
      next(error);
    }
  }
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await resetPassword(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
usersRouter.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);

  res.status(err.status || 500).send({
    error: {
      message: err.message || 'An error occured when hitting this route',
      data: err.data || {}
    }
  });
});

export default usersRouter;
