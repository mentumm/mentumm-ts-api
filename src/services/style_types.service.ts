import { KnexError } from "../types";
import db from "../database/db";
import { StyleType, UserStyleType } from "../models/style_types.model";

export const table = "style_types";

export const getStyleTypes = async (): Promise<StyleType[] | KnexError> => {
  return await db(table).select([
    "id",
    "name",
    "slug",
    "description",
    "color",
    "icon",
  ]);
};

export const deleteUserStyleTypes = async (
  user_id: string | undefined
): Promise<boolean | KnexError> => {
  try {
    await db("users_style_types")
      .where({
        user_id,
      })
      .delete()
      .returning("*")
      .catch(() => {
        return { message: "Unable to create user style type" };
      });

    return true;
  } catch (error) {
    throw new Error("Unable to create user style type");
  }
};

export const createUserStyleType = async (
  user_id: string | undefined,
  style_type_id: number
): Promise<UserStyleType[] | KnexError> => {
  try {
    const now = new Date();

    const newStyleType: UserStyleType[] | KnexError = await db(
      "users_style_types"
    )
      .insert({
        user_id,
        style_type_id,
        created_at: now,
        updated_at: now,
      })
      .returning("*")
      .catch(() => {
        return { message: "Unable to create user style type" };
      });

    return newStyleType;
  } catch (error) {
    throw new Error("Unable to create user style type");
  }
};
