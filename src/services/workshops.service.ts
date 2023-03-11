import { Knex } from "knex";
import { KnexError } from "../types";
import db from "../database/db";
import { Workshop } from "../models/workshops.model";

export const table = "workshops";

export const getWorkshops = async (): Promise<Workshop[] | KnexError> => {
  return await db(table)
    .select(["id", "name", "vimeo_id", "workbook_url", "year", "month"])
    .where("hidden", 0)
    .orderBy("year", "desc")
    .orderBy("month", "desc");
};
