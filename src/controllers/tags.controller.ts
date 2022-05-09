import { Request, Response } from "express";
import {
  createCoachTag,
  createTag,
  getTagCoaches,
  getTags,
} from "../services/tags.service";

export const newTag = async (req: Request, res: Response) => {
  const { name, slug, description } = req.body;

  if (!name || !slug || !description) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const tag = await createTag(
      name as string,
      slug as string,
      description as string
    );
    return res.json(tag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const newCoachTag = async (req: Request, res: Response) => {
  const { coach_id, tag_id } = req.body;

  if (!coach_id || !tag_id) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const coachTag = await createCoachTag(Number(coach_id), Number(tag_id));

    return res.json(coachTag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const tags = async (req: Request, res: Response) => {
  const { tag_id, slug, limit } = req.query;

  try {
    const tags = await getTags(
      Number(tag_id),
      slug as string,
      limit ? Number(limit) : 25
    );

    return res.json(tags);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const tagCoaches = async (req: Request, res: Response) => {
  const { coach_id, tag_id, limit } = req.query;

  try {
    const tagCoaches = await getTagCoaches(
      coach_id ? Number(coach_id) : null,
      tag_id ? Number(tag_id) : null,
      limit ? Number(limit) : 25
    );

    return res.json(tagCoaches);
  } catch (error) {
    return res.status(500).send(error);
  }
};
