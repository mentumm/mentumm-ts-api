import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import {
  bulkTagCoach,
  deleteCoachTag,
  deleteTag,
  editCoachTag,
  editTag,
  newCoachTag,
  newTag,
  tagCoaches,
  tags,
} from "../controllers/tags.controller";
import { routeValidation } from "../util/routeValidation";
import * as Joi from "joi";

const tagsRouter = express.Router();

tagsRouter.get(
  "/tags",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string(),
      slug: Joi.string(),
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
  async (req: Request, res: Response) => await editTag(req, res)
);

tagsRouter.post(
  "/tag",
  cors(publicCorsConfig),
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
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await deleteTag(req, res)
);

tagsRouter.post(
  "/tag-coach",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      coach_id: Joi.string().required(),
      tag_id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await newCoachTag(req, res)
);

tagsRouter.put(
  "/tag-coach",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
      coach_id: Joi.string().required(),
      tag_id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await editCoachTag(req, res)
);

tagsRouter.delete(
  "/tag-coach",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string().required(),
    }),
    "body"
  ),
  async (req: Request, res: Response) => await deleteCoachTag(req, res)
);

tagsRouter.get(
  "/tag-coaches",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      coach_id: Joi.string(),
      tag_id: Joi.string(),
      limit: Joi.number(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await tagCoaches(req, res)
);

tagsRouter.post(
  "/bulk-tag-coaches",
  cors(publicCorsConfig),
  routeValidation(
    Joi.object({
      id: Joi.string(),
      slug: Joi.string(),
      limit: Joi.number(),
    }),
    "query"
  ),
  async (req: Request, res: Response) => await bulkTagCoach(req, res)
);

export default tagsRouter;
