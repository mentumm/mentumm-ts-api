import { Request, Response } from "express";
import { getCoachByTagSlug } from "../services/coaches.service";
import {
  userTagDelete,
  createBulkUserTags,
  createUserTag,
  createTag,
  getUserTags,
  getTags,
  modifyUserTag,
  tagDelete,
  updateTag,
} from "../services/tags.service";

export const newTag = async (req: Request, res: Response) => {
  const { name, slug, description } = req.body;

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
  const { id } = req.body;

  try {
    const tag = await tagDelete(id as string);
    return res.json(tag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const newUserTag = async (req: Request, res: Response) => {
  const { user_id, tag_id } = req.body;

  try {
    const userTag = await createUserTag(Number(user_id), Number(tag_id));

    return res.json(userTag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const editUserTag = async (req: Request, res: Response) => {
  const { id, user_id, tag_id } = req.body;

  try {
    const userTag = await modifyUserTag(
      Number(id),
      Number(user_id),
      Number(tag_id)
    );

    return res.json(userTag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteUserTag = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const tag = await userTagDelete(id as string);
    return res.json(tag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const bulkUserTags = async (req: Request, res: Response) => {
  const { user_id, tag_ids, kind, clear } = req.body;

  try {
    const userTag = await createBulkUserTags(user_id, tag_ids, kind, clear);

    return res.json(userTag);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const tags = async (req: Request, res: Response) => {
  const { id, slug, kind, limit } = req.query;

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
        kind as string,
        limit ? Number(limit) : 100
      );

      return res.json(tags);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const userTags = async (req: Request, res: Response) => {
  const { user_id, tag_id, limit } = req.query;

  try {
    const tagUsers = await getUserTags(
      user_id ? Number(user_id) : null,
      tag_id ? Number(tag_id) : null,
      limit ? Number(limit) : 100
    );

    return res.json(tagUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
};
