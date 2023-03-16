import { KnexError } from "../types";
import db from "../database/db";
import { StyleType } from "../models/style_types.model";

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
