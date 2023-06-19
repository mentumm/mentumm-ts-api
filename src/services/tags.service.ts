import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import { UserTag, CreateTag, Tag } from "../models/tags.model";
import { User } from "../models/users.model";
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

export const tagDelete = async (id: string): Promise<Tag[] | KnexError> => {
  try {
    const deletedTag: Tag[] | KnexError = await db("tags")
      .where({ id })
      .del()
      .returning("*")
      .catch((err: Error) => {
        console.log(err);
        return { message: "Unable to delete Tag?" };
      });

    return deletedTag;
  } catch (error) {
    throw new Error("Unable to delete Tag");
  }
};

export const createUserTag = async (
  user_id: number,
  tag_id: number
): Promise<UserTag[] | KnexError> => {
  try {
    const newUserTag: UserTag[] | KnexError = await db("user_tag")
      .insert({
        user_id,
        tag_id,
      })
      .returning("*")
      .catch((err: Error) => {
        return { message: `Unable to create User Tag: ${err.message}` };
      });

    return newUserTag;
  } catch (error) {
    throw new Error("Unable to create Tag");
  }
};

export const modifyUserTag = async (
  id: number,
  user_id: number,
  tag_id: number
): Promise<UserTag[] | KnexError> => {
  try {
    const newUserTag: UserTag[] | KnexError = await db("user_tag")
      .where({ id })
      .update({
        user_id,
        tag_id,
        updated_at: moment().format(),
      })
      .returning("*")
      .catch((err: Error) => {
        return { message: `Unable to update user_tag: ${err.message}` };
      });

    return newUserTag;
  } catch (error) {
    throw new Error("Unable to update user_tag");
  }
};

export const userTagDelete = async (id: string): Promise<Tag[] | KnexError> => {
  try {
    const deletedTag: Tag[] | KnexError = await db("user_tag")
      .where({ id })
      .del()
      .returning("*")
      .catch((err: Error) => {
        console.log(err);
        return { message: "Unable to delete user_tag?" };
      });

    return deletedTag;
  } catch (error) {
    throw new Error("Unable to delete user_tag");
  }
};

export const createBulkUserTags = async (
  user_id: string,
  tag_ids: number[],
  kind: string,
  clear: boolean
): Promise<{ message: string }> => {
  try {
    const user: User = await db("users").where({ id: user_id }).first();

    if (!user) {
      throw new Error("Unable to find your User");
    }

    if (clear) {
      await db("user_tag")
        .join("tags", "user_tag.tag_id", "tags.id")
        .where({ "user_tag.user_id": user_id, "tags.kind": kind })
        .delete()
    }

    tag_ids.forEach(async (id: number) => {
      const currentTag = await db("tags").where({ id }).first();

      if (user && currentTag) {
        createUserTag(Number(user.id), Number(currentTag.id));
      }
    });

    return { message: "Bulk association of Tags complete!" };
  } catch (error) {
    throw new Error("Unable to associate Tag/User");
  }
};

export const getTags = async (
  id: number,
  kind: string,
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
      .where((builder: Knex.QueryBuilder) => {
        if (kind) {
          builder.where("kind", kind);
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

export const getUserTags = async (
  user_id: number | null,
  tag_id: number | null,
  limit: number
): Promise<UserTag[]> => {
  try {
    const tagUsers = await db("user_tag")
      .where((builder: Knex.QueryBuilder) => {
        if (user_id) {
          builder.where({ user_id });
        } else if (tag_id) {
          builder.where({ tag_id });
        } else {
          builder.select("*");
        }
      })
      .returning("*")
      .limit(limit);

    return tagUsers;
  } catch (error) {
    throw new Error("Unable to get Tags");
  }
};
