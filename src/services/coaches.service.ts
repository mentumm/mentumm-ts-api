import moment from "moment";
import db from "../database/db";
import {
  Coach,
  CoachRating,
  CreateCoach,
  UpdateCoach,
} from "../models/coaches.model";
import { User } from "../models/users.model";
import { KnexError } from "../types";

export const getCoaches = async (
  id: number,
  name: string,
  limit: number,
  search?: string
): Promise<Coach[] | KnexError> => {
  if (search) {
    const searchResults = await db("users")
      .select("users.*", db.raw("JSON_AGG(tags.*) as skills"))
      .whereNull("deleted_at")
      .andWhere("role", "coach")
      .andWhereRaw(`users.first_name ILIKE '%${search}%'`)
      .orWhereRaw(`users.last_name ILIKE '%${search}%'`)
      .leftJoin("coach_tags", "users.id", "coach_tags.coach_id")
      .leftJoin("tags", "tags.id", "coach_tags.tag_id")
      .groupBy("users.id");

    return searchResults;
  }

  // yes, this is verbose and repeats but i couldn't get builder to work
  // with this query
  if (id) {
    const coach = await db("users")
      .whereNull("deleted_at")
      .andWhere("role", "coach")
      .select("users.*", db.raw("JSON_AGG(tags.*) as skills"))
      .where("users.id", id)
      .leftJoin(
        db("coach_tags").select("*").as("ct"),
        "ct.coach_id",
        "users.id"
      )
      .leftJoin(db("tags").select("*").as("tags"), "ct.tag_id", "tags.id")
      .whereNull("users.deleted_at")
      .whereIn(
        "users.id",
        db("coach_tags")
          .select("coach_id")
          .innerJoin("tags", "tags.id", "coach_tags.tag_id")
      )
      .groupBy("users.id")
      .limit(limit);

    return coach;
  } else if (name) {
    const coach = await db("users")
      .whereNull("deleted_at")
      .andWhere("role", "coach")
      .select("users.*", db.raw("JSON_AGG(tags.*) as skills"))
      .where("users.name", name)
      .leftJoin(
        db("coach_tags").select("*").as("ct"),
        "ct.coach_id",
        "users.id"
      )
      .leftJoin(db("tags").select("*").as("tags"), "ct.tag_id", "tags.id")
      .whereNull("users.deleted_at")
      .whereIn(
        "users.id",
        db("coach_tags")
          .select("coach_id")
          .innerJoin("tags", "tags.id", "coach_tags.tag_id")
      )
      .groupBy("users.id")
      .limit(limit);

    return coach;
  }

  const coach = await db("users")
    .select("users.*", db.raw("JSON_AGG(tags.*) as skills"))
    .where("role", "coach")
    .leftJoin("coach_tags", "users.id", "coach_tags.coach_id")
    .leftJoin("tags", "tags.id", "coach_tags.tag_id")
    .groupBy("users.id");

  return coach;
};

export const createCoach = async (
  body: Partial<User>
): Promise<User[] | KnexError> => {
  try {
    const {
      first_name,
      last_name,
      bio,
      photo_url,
      booking_url,
      linkedin_url,
      location,
    } = body;
    const coach: Partial<User> = {
      first_name,
      last_name,
      bio,
      photo_url,
      booking_url,
      linkedin_url,
      location,
    };

    const newCoach: User[] | KnexError = await db("users")
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
  body: Partial<User>
): Promise<User[] | KnexError> => {
  try {
    const {
      id,
      first_name,
      last_name,
      bio,
      photo_url,
      booking_url,
      linkedin_url,
      location,
    } = body;

    const update: User[] | KnexError = await db("users")
      .where({ id, role: "coach" })
      .update({
        first_name,
        last_name,
        bio,
        photo_url,
        booking_url,
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

export const deleteCoach = async (id: number): Promise<User[] | KnexError> => {
  const coach: User[] | KnexError = await db("users")
    .update({
      deleted_at: moment().toISOString(),
      updated_at: moment().toISOString(),
      role: "user",
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

export const getCoachByTagSlug = async (
  slug: string,
  limit: number
): Promise<Coach[]> => {
  try {
    const coach_tags = await db("coaches")
      .select("coaches.*", db.raw("JSON_AGG(tags.*) as skills"))
      .leftJoin(
        db("coach_tags").select("*").as("ct"),
        "ct.coach_id",
        "coaches.id"
      )
      .leftJoin(db("tags").select("*").as("tags"), "ct.tag_id", "tags.id")

      .whereNull("coaches.deleted_at")
      .whereIn(
        "coaches.id",
        db("coach_tags")
          .select("coach_id")
          .innerJoin("tags", "tags.id", "coach_tags.tag_id")
          .where("tags.slug", slug)
      )
      .groupBy("coaches.id")
      .limit(limit);

    return coach_tags;
  } catch (error) {
    throw new Error("Unable to find Coach / Tags");
  }
};

export const createCoachRating = async (
  body: CoachRating
): Promise<CoachRating[] | KnexError> => {
  try {
    const {
      user_id,
      coach_id,
      rating_overall,
      rating_listening,
      additional_comments,
      primary_topic,
      user_learned,
      user_would_book_again,
      user_coach_id,
    } = body;

    const coachRating: CoachRating = {
      user_id: Number(user_id),
      coach_id: Number(coach_id),
      rating_overall: Number(rating_overall),
      rating_listening: Number(rating_listening),
      primary_topic: primary_topic,
      user_learned: user_learned,
      user_would_book_again: user_would_book_again,
      additional_comments: additional_comments ? additional_comments : null,
      user_coach_id: user_coach_id ? user_coach_id : null,
    };

    const newCoachRating: CoachRating[] | KnexError = await db(
      "coach_user_ratings"
    )
      .insert(coachRating)
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          console.log(err);
          return { message: "Unable to create Review" };
        } else {
          throw new Error("Unable to create Review");
        }
      });

    return newCoachRating;
  } catch (error) {
    throw new Error("Unable to create new Coach");
  }
};
