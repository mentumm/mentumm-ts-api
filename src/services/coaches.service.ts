import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import bcrypt from "bcrypt";
import { mixpanelEvent } from "../helpers/mixpanel";
import { emailService, EmailTemplate } from "../helpers/emailService";
import { Coach, CoachRating, RegisterCoach } from "../models/coaches.model";
import { User } from "../models/users.model";
import { KnexError } from "../types";

export const getCoaches = async (
  id: number,
  limit: number,
  search?: string
): Promise<Coach[] | KnexError> => {
  const coaches = await db("users")
    .select(
      "users.*",
      db.raw(
        "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'expertise'), '[]') as expertise"
      ),
      db.raw(
        "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'style'), '[]') as styles"
      )
    )
    .modify((qb: Knex.QueryBuilder) => {
      if (id) {
        qb.where("users.id", id);
      }
      if (search) {
        qb.whereRaw(`users.first_name ILIKE '%${search}%'`);
        qb.andWhere({ is_test: false });
        qb.orWhereRaw(`users.last_name ILIKE '%${search}%'`);
        qb.orderBy("users.first_name");
      }
    })
    .having("users.role", "=", "coach")
    .leftJoin("user_tag", "users.id", "user_tag.user_id")
    .leftJoin("tags", "tags.id", "user_tag.tag_id")
    .havingRaw("users.deleted_at is null")
    .groupBy("users.id")
    .orderBy("users.first_name", "asc")
    .limit(limit);

  return coaches;
};

export const createCoach = async (
  body: RegisterCoach
): Promise<Coach[] | KnexError> => {
  const { first_name, last_name, email, password } = body;
  try {
    let errors = null;
    const lowercaseEmail = email.toLowerCase();

    const hashPassword = await bcrypt.hash(password, 10);
    const coach: Partial<Coach> = {
      first_name,
      last_name,
      email: lowercaseEmail,
      password: hashPassword,
      role: 'coach',
    };

    const newCoach: Coach[] = await db("users")
      .insert(coach)
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          console.log(err);
          errors = { message: "User email address is already being used" };
          return [];
        } else {
          throw new Error("Unable to create new User");
        }
      });

    if (errors) {
      return errors;
    } else {

      mixpanelEvent("New Coach Registered", {
        distinct_id: newCoach[0].id,
        "Coach ID": newCoach[0].id,
        "Coach First Name": newCoach[0].first_name,
        "Coach Last Name": newCoach[0].last_name,
      });

      emailService.send(EmailTemplate.COACH_WELCOME, newCoach[0].email, {
        first_name: newCoach[0].first_name,
      });

      return newCoach;
    }
  } catch (error) {
    throw new Error("Unable to register new Coach");
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
    const user_tags = await db("users")
      .select(
        "users.*",
        db.raw(
          "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'expertise'), '[]') as expertise"
        ),
        db.raw(
          "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'style'), '[]') as styles"
        )
      )
      .where({ role: "coach" })
      .leftJoin(db("user_tag").select("*").as("ct"), "ct.user_id", "users.id")
      .leftJoin(db("tags").select("*").as("tags"), "ct.tag_id", "tags.id")

      .having("users.deleted_at", "is", null)
      .whereIn(
        "users.id",
        db("user_tag")
          .select("user_id")
          .innerJoin("tags", "tags.id", "user_tag.tag_id")
          .where("tags.slug", slug)
      )
      .groupBy("users.id")
      .limit(limit);

    return user_tags;
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
