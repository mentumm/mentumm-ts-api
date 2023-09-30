import { Knex } from "knex";
import db from "../database/db";
import bcrypt from "bcrypt";
import moment from "moment";
import {
  CoachBooking,
  CreateUser,
  RegisterUser,
  UpdateUser,
  User,
} from "../models/users.model";
import { KnexError } from "../types";
import { getEmployerByInvite } from "./employers.service";
import { Employer } from "../models/employers.model";
import { emailService, EmailTemplate } from "../helpers/emailService";
import { mixpanelEvent } from "../helpers/mixpanel";
import { omit } from "lodash";
import { ulid } from "ulid";

export const getUsers = async (
  id: number,
  name: string,
  email: string,
  employer_id: number,
  limit = 100
): Promise<User[] | KnexError> => {
  const user = await db("users")
    .whereNull("deleted_at")
    .where((builder: Knex.QueryBuilder) => {
      if (id) {
        builder.where({ id: id });
      }
      if (name) {
        builder.where("first_name", "ilike", `%${name}%`);
      }
      if (email) {
        builder.where({ email: email.toLowerCase() });
      }
      if (employer_id) {
        builder.where({ employer_id: employer_id });
      }
    })
    .limit(limit)
    .returning("*");

  const mappedUsers = user.map((user: User) => {
    return {
      ...user,
      achievements: user.achievements ? JSON.parse(user.achievements) : [],
      hobbies: user.hobbies ? JSON.parse(user.hobbies) : [],
    };
  });

  return mappedUsers;
};

export const createUser = async (
  body: CreateUser
): Promise<User[] | KnexError> => {
  try {
    const { first_name, last_name, email, employer_id, password, is_test } =
      body;
    const lowercaseEmail = email.toLowerCase();

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user: CreateUser = {
        first_name,
        last_name,
        email: lowercaseEmail,
        employer_id,
        password: hashPassword,
        role: "user",
        is_test: is_test || false,
      };

      const newUser: User[] | { message: string } = await db("users")
        .insert(user)
        .returning("*")
        .catch((err: Error) => {
          if (err) {
            return { message: "User email address is already being used" };
          } else {
            throw new Error("Unable to create new User");
          }
        });

      return newUser;
    } else {
      // TODO: add email pw reset as this will be hit from admin/postman
      const user: CreateUser = {
        first_name,
        last_name,
        email: lowercaseEmail,
        employer_id,
        role: "user",
        is_test: is_test || false,
      };

      const newUser: User[] | { message: string } = await db("users")
        .insert(user)
        .returning("*")
        .catch((err: Error) => {
          if (err) {
            return { message: "User email address is already being used" };
          } else {
            throw new Error("Unable to create new User");
          }
        });

      return newUser;
    }
  } catch (error) {
    throw new Error("Unable to create new User");
  }
};

export const createBooking = async (
  body: CoachBooking
): Promise<CoachBooking[] | KnexError> => {
  try {
    const {
      user_id,
      coach_id,
      invitee_email,
      invitee_full_name,
      invitee_uuid,
      event_end_time,
      event_start_time,
      event_type_name,
      event_type_uuid,
    } = body;
    const lowercaseInviteeEmail = invitee_email?.toLowerCase();

    const coachBooking: CoachBooking = {
      user_id,
      coach_id,
      invitee_email: lowercaseInviteeEmail,
      invitee_full_name,
      invitee_uuid,
      event_end_time,
      event_start_time,
      event_type_name,
      event_type_uuid,
    };

    const booking: CoachBooking[] = await db("user_coaches")
      .insert(coachBooking)
      .returning("*")
      .catch((err: Error) => {
        throw new Error(`Unable to create new User: ${err.message}`);
      });

    return booking;
  } catch (error) {
    throw new Error("Unable to create new User");
  }
};

export const registerUser = async (
  body: RegisterUser
): Promise<User[] | KnexError> => {
  try {
    let errors = null;
    const { first_name, last_name, email, password, invite_code } = body;
    const lowercaseEmail = email.toLowerCase();

    const employer: Employer = await getEmployerByInvite(invite_code);

    if (!employer) {
      return { message: "Invitation Code not found!" };
    }

    if (employer.invitation_code !== invite_code) {
      return { message: "Invalid Invite Code!" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user: CreateUser = {
      first_name,
      last_name,
      email: lowercaseEmail,
      employer_id: Number(employer.id),
      password: hashPassword,
      role: "user",
    };

    const newUser: User[] = await db("users")
      .insert(user)
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          errors = { message: "User email address is already being used" };
          return [];
        } else {
          throw new Error("Unable to create new User");
        }
      });

    if (errors) {
      return errors;
    } else {
      const employer: Employer = await db("employers")
        .where({ id: newUser[0].employer_id })
        .first();

      mixpanelEvent("New User Registered", {
        distinct_id: newUser[0].id,
        "User ID": newUser[0].id,
        "User First Name": newUser[0].first_name,
        "User Last Name": newUser[0].last_name,
        "Employer ID": newUser[0].employer_id,
        "Employer Name": employer.name,
      });

      emailService.send(EmailTemplate.WELCOME, newUser[0].email, {
        first_name: newUser[0].first_name,
      });

      return newUser;
    }
  } catch (error) {
    throw new Error("Unable to register new User");
  }
};

export const updateUser = async (
  body: UpdateUser
): Promise<User[] | KnexError> => {
  const { id, password, email, ...updateData } = body;
  const lowerCaseEmail = email.toLowerCase();

  let hashPassword;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  try {
    const update: User[] | { message: string } = await db("users")
      .where({ id })
      .update({
        email: lowerCaseEmail,
        ...updateData,
        ...(password && { password: hashPassword }),
        updated_at: moment().toISOString(),
      })
      .returning("*");

    return update;
  } catch (error) {
    throw new Error("Unable to edit User");
  }
};

export const deleteUser = async (id: number): Promise<User[] | KnexError> => {
  const user: User[] | KnexError = await db("users")
    .update({
      deleted_at: moment().toISOString(),
      updated_at: moment().toISOString(),
    })
    .where({ id: id })
    .returning("*")
    .catch((err: Error) => {
      if (err) {
        return { message: "There was a problem deactivating this User" };
      }
      throw new Error("Unable to deactivate User");
    });

  return user;
};

export const authenticateUser = async (email: string, password: string) => {
  const lowerCaseEmail = email.toLowerCase();
  const user: User = await db("users")
    .select()
    .where({ email: lowerCaseEmail })
    .first();

  if (!user) {
    return { message: "Username or Password does not match" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    await db("users")
      .where("id", user.id)
      .update({ last_sign_in: db.fn.now() });

    const loggedInUser: Omit<User, "password"> = omit(user, "password");

    return loggedInUser;
  } else {
    return { message: "Username or Password does not match" };
  }
};

export const getUpcomingBookings = async (
  id: number
): Promise<CoachBooking[] | KnexError> => {
  const bookings = await db("user_coaches")
    .select("user_coaches.*", db.raw("row_to_json(c) as coach"))
    .leftJoin(
      db("users")
        .select(
          "users.*",
          db.raw(
            "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'expertise'), '[]') as expertise"
          ),
          db.raw(
            "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'style'), '[]') as styles"
          )
        )
        .leftJoin("user_tag", "user_tag.user_id", "=", "users.id")
        .leftJoin("tags", "user_tag.tag_id", "=", "tags.id")
        .groupBy("users.id")
        .as("c"),
      "c.id",
      "=",
      "user_coaches.coach_id"
    )
    .whereRaw(
      "TO_TIMESTAMP(event_start_time, 'YYYY-MM-DDTHH24:MI:SSTZH') > TO_TIMESTAMP(?)",
      [Date.now() / 1000.0]
    )
    .where({ "user_coaches.user_id": id })
    .returning("*")
    .catch((err: Error) => {
      if (err) {
        return { message: "There was a problem getting upcoming bookings" };
      }
      throw new Error("Unable to get upcoming bookings");
    });

  return bookings;
};

export const getPastBookings = async (
  id: number
): Promise<CoachBooking[] | KnexError> => {
  const bookings = await db("user_coaches")
    .select(
      "user_coaches.*",
      db.raw("row_to_json(coach_user_ratings) as user_review"),
      db.raw("row_to_json(c) as coach")
    )
    .leftJoin(
      "coach_user_ratings",
      "coach_user_ratings.user_coach_id",
      "=",
      "user_coaches.id"
    )
    .leftJoin(
      db("users")
        .select(
          "users.*",
          db.raw(
            "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'expertise'), '[]') as expertise"
          ),
          db.raw(
            "COALESCE(JSON_AGG(DISTINCT tags.*) FILTER (WHERE tags.id IS NOT NULL AND tags.kind = 'style'), '[]') as styles"
          )
        )
        .leftJoin("user_tag", "user_tag.user_id", "=", "users.id")
        .leftJoin("tags", "user_tag.tag_id", "=", "tags.id")
        .groupBy("users.id")
        .as("c"),
      "c.id",
      "=",
      "user_coaches.coach_id"
    )
    .whereRaw(
      "TO_TIMESTAMP(event_start_time, 'YYYY-MM-DDTHH24:MI:SSTZH') < TO_TIMESTAMP(?)",
      [Date.now() / 1000.0]
    )
    .where({ "user_coaches.user_id": id })
    .returning("*")
    .catch((err: Error) => {
      if (err) {
        return { message: "There was a problem getting past bookings" };
      }
      throw new Error("Unable to get past bookings");
    });

  return bookings;
};

export const initiatePasswordReset = async (
  email: string,
  origin: string
): Promise<void> => {
  const user = await db("users")
    .whereNull("deleted_at")
    .where({ email: email.toLocaleLowerCase() })
    .returning("*")
    .first();

  if (user) {
    const token = ulid();

    await db("users")
      .where({ id: user.id })
      .update({
        reset_password_token: token,
        reset_password_expiration: moment().add("1", "day").toISOString(),
        updated_at: moment().toISOString(),
      })
      .returning("*");

    let baseUrl = process.env.BASE_URL;

    if (process.env.NODE_ENV === "staging" && origin.endsWith("onrender.com")) {
      baseUrl = `${origin}`;
    }

    emailService.send(EmailTemplate.PASSWORD_RESET, user.email, {
      first_name: user.first_name,
      password_reset_link: `${baseUrl}/reset-password/${token}`,
    });
  }
};

export const resetPasswordFromToken = async (
  reset_password_token: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  const user = await db("users")
    .whereNull("deleted_at")
    .where({ reset_password_token })
    .returning("*")
    .first();

  if (user) {
    const expiration = moment(user.reset_password_expiration);

    if (!expiration.isValid() || moment().isAfter(expiration)) {
      return {
        success: false,
        message: "Your password reset link has expired.",
      };
    }

    await db("users")
      .where({ id: user.id })
      .update({
        password: await bcrypt.hash(password, 10),
        reset_password_token: null,
        reset_password_expiration: null,
        updated_at: moment().toISOString(),
      })
      .returning("*");

    emailService.send(EmailTemplate.PASSWORD_CHANGED, user.email, {
      first_name: user.first_name,
    });

    return { success: true, message: "Ok." };
  }

  return {
    success: false,
    message: "Your password reset link has is no longer active.",
  };
};
