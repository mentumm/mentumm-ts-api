import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import {
  Coach,
  CoachRating,
  CreateCoach,
  UpdateCoach,
} from "../models/coaches.model";
import { KnexError } from "../types";

export const getCoaches = async (
  id: number,
  name: string,
  limit: number
): Promise<Coach[] | KnexError> => {
  // yes, this is verbose and repeats but i couldn't get builder to work
  // with this query
  if (id) {
    const coach = await db("coaches")
      .whereNull("deleted_at")
      .select("coaches.*", db.raw("JSON_AGG(tags.*) as skills"))
      .where("coaches.id", id)
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
      )
      .groupBy("coaches.id")
      .limit(limit);

    return coach;
  } else if (name) {
    const coach = await db("coaches")
      .whereNull("deleted_at")
      .select("coaches.*", db.raw("JSON_AGG(tags.*) as skills"))
      .where("coaches.name", name)
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
      )
      .groupBy("coaches.id")
      .limit(limit);

    return coach;
  }

  const coach = await db("coaches").select("*");

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
