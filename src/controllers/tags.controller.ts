import { Request, Response } from "express";
import { getCoachByTagSlug } from "../services/coaches.service";
import {
  createBulkCoachTag,
  createCoachTag,
  createTag,
  getTagCoaches,
  getTags,
  tagDelete,
  updateTag,
} from "../services/tags.service";

export const newTag = async (req: Request, res: Response) => {
  const { name, slug, description } = req.body;

  if (!name || !slug) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const tag = await createTag(
      name as string,
      slug as string,
      description ? description : null
    );
    return res.json(tag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const editTag = async (req: Request, res: Response) => {
  const { id, name, slug, description } = req.body;

  if (!name || !slug || !id) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const tag = await updateTag(
      id as string,
      name as string,
      slug as string,
      description ? description : null
    );
    return res.json(tag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id, name, slug, description } = req.body;

  if (!id) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const tag = await tagDelete(id as string);
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

export const bulkTagCoach = async (req: Request, res: Response) => {
  const { coach_name, tags } = req.body;

  if (!coach_name) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const coachTag = await createBulkCoachTag(coach_name, tags);

    return res.json(coachTag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const tags = async (req: Request, res: Response) => {
  const { id, slug, limit } = req.query;

  try {
    if (slug) {
      const coaches = await getCoachByTagSlug(
        slug as string,
        limit ? Number(limit) : 100
      );

      return res.json(coaches);
    } else {
      const tags = await getTags(
        Number(id),
        slug as string,
        limit ? Number(limit) : 100
      );

      return res.json(tags);
    }
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
      limit ? Number(limit) : 100
    );

    return res.json(tagCoaches);
  } catch (error) {
    return res.status(500).send(error);
  }
};
