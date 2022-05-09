import express, { Request, Response } from "express";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";
import {
  newCoachTag,
  newTag,
  tagCoaches,
  tags,
} from "../controllers/tags.controller";

const tagsRouter = express.Router();

tagsRouter.get(
  "/tags",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await tags(req, res)
);

tagsRouter.post(
  "/tag",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await newTag(req, res)
);

tagsRouter.post(
  "/tag-coach",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await newCoachTag(req, res)
);

tagsRouter.get(
  "/tag-coaches",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await tagCoaches(req, res)
);

export default tagsRouter;
