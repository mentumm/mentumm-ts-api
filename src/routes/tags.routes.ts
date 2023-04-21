import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import {
  bulkUserTags,
  deleteUserTag,
  deleteTag,
  editUserTag,
  editTag,
  newUserTag,
  newTag,
  userTags,
  tags,
} from "../controllers/tags.controller";
import { routeValidation } from "../util/routeValidation";
import * as Joi from "joi";
import passport from "passport";

const tagsRouter = express.Router();

tagsRouter.get(
  "/tags",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string(),
      slug: Joi.string(),
      kind: Joi.string(),
      limit: Joi.number(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await tags(req, res)
);

tagsRouter.put(
  "/tag",
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
      slug: Joi.string().required(),
      description: Joi.string(),
    }),
    "body"
  ),
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req: Request, res: Response) => await editTag(req, res)
);

tagsRouter.post(
  "/tag",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      name: Joi.string().required(),
      slug: Joi.string().required(),
      description: Joi.string(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await newTag(req, res)
);

tagsRouter.delete(
  "/tag",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await deleteTag(req, res)
);

tagsRouter.post(
  "/user/tag",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      user_id: Joi.string().required(),
      tag_id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await newUserTag(req, res)
);

tagsRouter.put(
  "/user/tag",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
      user_id: Joi.string().required(),
      tag_id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await editUserTag(req, res)
);

tagsRouter.delete(
  "/user/tag",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await deleteUserTag(req, res)
);

tagsRouter.get(
  "/user/tag",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      user_id: Joi.string(),
      tag_id: Joi.string(),
      limit: Joi.number(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await userTags(req, res)
);

tagsRouter.post(
  "/user/tags",
  cors(publicCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  routeValidation(
    Joi.object({
      user_id: Joi.string(),
      tag_ids: Joi.array().items(Joi.number()),
      clear: Joi.boolean().default(false),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await bulkUserTags(req, res)
);

export default tagsRouter;
