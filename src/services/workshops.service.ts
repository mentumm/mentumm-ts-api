import { KnexError } from "../types";
import db from "../database/db";
import { Workshop } from "../models/workshops.model";

export const table = "workshops";

export const getWorkshops = async (): Promise<Workshop[] | KnexError> => {
  return await db(table)
    .select(["id", "name", "slug", "vimeo_id", "workbook_url", "thumbnail_url"])
    .where("hidden", 0)
    .orderBy("name", "asc");
};

export const getWorkshopsBySlug = async (
  slug: string
): Promise<Workshop | KnexError> => {
  const workshop = await db(table)
    .select(["id", "name", "slug", "vimeo_id", "workbook_url", "thumbnail_url"])
    .where("slug", slug)
    .where("hidden", 0)
    .limit(1);

  return workshop?.[0];
};

export const createWorkshop = async (payload: Workshop): Promise<Workshop> => {
  const workshop = await db(table)
    .insert({
      ...payload,
    })
    .returning("*")
    .catch((error) => {
      throw error;
    });
  return workshop[0];
};

export const updateWorkshop = async (
  id: number,
  payload: Workshop
): Promise<Workshop> => {
  const workshop = await db(table)
    .where({ id })
    .update({
      ...payload,
    })
    .returning("*")
    .catch((error) => {
      throw error;
    });
  return workshop[0];
};

export const deleteWorkshop = async (id: number): Promise<Workshop> => {
  const workshop = await db(table)
    .where({ id })
    .del()
    .returning("*")
    .catch((error) => {
      throw error;
    });
  return workshop[0];
};
