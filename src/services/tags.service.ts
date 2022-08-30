import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import { Coach } from "../models/coaches.model";
import { CoachTag, CreateTag, Tag, UpdateTag } from "../models/tags.model";
import { KnexError } from "../types";

export const createTag = async (
  name: string,
  slug: string,
  description?: string | undefined
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
        console.log(err);
        return { message: "Unable to create Tag?" };
      });

    return newTag;
  } catch (error) {
    throw new Error("Unable to create new Tag");
  }
};

export const updateTag = async (
  id: string,
  name: string,
  slug: string,
  description?: string | undefined
): Promise<Tag[] | KnexError> => {
  try {
    const updateTag: Tag[] | KnexError = await db("tags")
      .where({ id })
      .update({ name, slug, description, updated_at: moment().format() })
      .returning("*")
      .catch((err: Error) => {
        console.log(err);
        return { message: "Unable to update Tag?" };
      });

    return updateTag;
  } catch (error) {
    throw new Error("Unable to update Tag");
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

export const createBulkCoachTag = async (
  coachName: string,
  tags: string[]
): Promise<{ message: string }> => {
  try {
    const coach: Coach = await db("coaches").where({ name: coachName }).first();

    if (!coach) {
      throw new Error("Unable to find your Coach");
    }

    tags.forEach(async (tag: string) => {
      const currenTag = await db("tags").where({ name: tag }).first();

      if (coach && currenTag) {
        createCoachTag(Number(coach.id), Number(currenTag.id));
      }
    });

    return { message: "Bulk association of Tags complete!" };
  } catch (error) {
    throw new Error("Unable to associate Tag/Coach");
  }
};

export const getTags = async (
  id: number,
  slug: string,
  limit = 100
): Promise<Tag[]> => {
  try {
    const tags = await db("tags")
      .where((builder: Knex.QueryBuilder) => {
        if (id) {
          builder.where({ id: id });
        } else {
          builder.select("*");
        }
      })
      .returning("*")
      .limit(limit);

    return tags;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to get Tags");
  }
};

export const getTagCoaches = async (
  coach_id: number | null,
  tag_id: number | null,
  limit: number
): Promise<CoachTag[]> => {
  try {
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
