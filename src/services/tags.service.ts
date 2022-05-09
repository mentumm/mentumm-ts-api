import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import { CoachTag, CreateTag, Tag } from "../models/tags.model";
import { KnexError } from "../types";

export const createTag = async (
  name: string,
  slug: string,
  description: string
): Promise<Tag[] | KnexError> => {
  try {
    const tag: CreateTag = {
      name,
      slug,
      description,
    };

    const newTag: Tag[] | KnexError = await db("tags")
      .insert(tag)
      .returning("*")
      .catch((err: Error) => {
        return { message: "Unable to create Tag?" };
      });

    return newTag;
  } catch (error) {
    throw new Error("Unable to create new Tag");
  }
};

export const createCoachTag = async (
  coach_id: number,
  tag_id: number
): Promise<CoachTag[] | KnexError> => {
  try {
    const newCoachTag: CoachTag[] | KnexError = await db("coach_tags")
      .insert({
        coach_id,
        tag_id,
      })
      .returning("*")
      .catch((err: Error) => {
        return { message: "Unable to create Tag?" };
      });

    return newCoachTag;
  } catch (error) {
    throw new Error("Unable to create Tag");
  }
};

export const getTags = async (
  id: number,
  slug: string,
  limit = 25
): Promise<Tag[]> => {
  try {
    const tags = await db("tags")
      .where((builder: Knex.QueryBuilder) => {
        if (id) {
          builder.where({ id: id });
        } else if (slug) {
          builder.where({ slug: slug });
        } else {
          builder.select("*");
        }
      })
      .returning("*")
      .limit(limit);

    return tags;
  } catch (error) {
    throw new Error("Unable to get Tags");
  }
};

export const getTagCoaches = async (
  coach_id: number | null,
  tag_id: number | null,
  limit: number
): Promise<CoachTag[]> => {
  try {
    console.log("coach", coach_id);
    console.log("tag", tag_id);
    console.log("limit", limit);
    const tagCoaches = await db("coach_tags")
      .where((builder: Knex.QueryBuilder) => {
        if (coach_id) {
          builder.where({ coach_id: coach_id });
        } else if (tag_id) {
          builder.where({ tag_id: tag_id });
        } else {
          builder.select("*");
        }
      })
      .returning("*")
      .limit(limit);

    return tagCoaches;
  } catch (error) {
    throw new Error("Unable to get Tags");
  }
};
