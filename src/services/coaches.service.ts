import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import { Coach, CreateCoach, UpdateCoach } from "../models/coaches.model";
import { KnexError } from "../types";

export const getCoaches = async (
  id: number,
  name: string,
  limit: number
): Promise<Coach[] | KnexError> => {
  const coach = await db("coaches")
    .whereNull("deleted_at")
    .where((builder: Knex.QueryBuilder) => {
      if (id) {
        builder.where({ id: id });
      } else if (name) {
        builder.where({ name: name });
      } else {
        builder.select("*");
      }
    })
    .returning("*")
    .limit(limit);

  return coach;
};

export const createCoach = async (
  body: CreateCoach
): Promise<Coach[] | KnexError> => {
  try {
    const { name, bio, photo_url, booking_link, linkedin_url, location } = body;
    const coach: CreateCoach = {
      name,
      bio: bio ? bio : null,
      photo_url: photo_url ? photo_url : null,
      booking_link,
      linkedin_url: linkedin_url ? linkedin_url : null,
      location: location ? location : null,
    };

    const newCoach: Coach[] | KnexError = await db("coaches")
      .insert(coach)
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          return { message: "Coach name is already being used" };
        } else {
          throw new Error("Unable to create new Coach");
        }
      });

    return newCoach;
  } catch (error) {
    throw new Error("Unable to create new Coach");
  }
};

export const updateCoach = async (
  body: UpdateCoach
): Promise<Coach[] | KnexError> => {
  try {
    const { id, name, bio, photo_url, booking_link, linkedin_url, location } =
      body;

    const update: Coach[] | KnexError = await db("coaches")
      .where({ id })
      .update({
        name,
        bio,
        photo_url,
        booking_link,
        linkedin_url,
        location,
        updated_at: moment().toISOString(),
      })
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          return {
            message: "Coach name is already being used",
          };
        } else {
          throw new Error("Unable to edit Coach");
        }
      });

    return update;
  } catch (error) {
    throw new Error("Unable to edit Coach");
  }
};

export const deleteCoach = async (id: number): Promise<Coach[] | KnexError> => {
  const coach: Coach[] | KnexError = await db("coaches")
    .update({
      deleted_at: moment().toISOString(),
      updated_at: moment().toISOString(),
    })
    .where({ id: id })
    .returning("*")
    .catch((err: Error) => {
      if (err) {
        return { message: "There was a problem deactivating this Coach" };
      }
      throw new Error("Unable to deactivate Coach");
    });

  return coach;
};
