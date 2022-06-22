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
import { getEmployerByInvite, getEmployers } from "./employers.service";
import { Employer } from "../models/employers.model";
import { mixpanelEvent } from "../helpers/mixpanel";
import { Coach } from "../models/coaches.model";

export const getUsers = async (
  id: number,
  name: string,
  email: string,
  employer_id: number,
  limit: number
): Promise<User[] | KnexError> => {
  const user = await db("users")
    .whereNull("deleted_at")
    .where((builder: Knex.QueryBuilder) => {
      if (id) {
        builder.where({ id: id });
      } else if (name) {
        builder.where({ name: name });
      } else if (email) {
        builder.where({ email: email });
      } else if (employer_id) {
        builder.where({ employer_id: employer_id });
      } else {
        builder.select("*").limit(limit);
      }
    })
    .returning("*");

  return user;
};

export const createUser = async (
  body: CreateUser
): Promise<User[] | KnexError> => {
  try {
    const { name, email, employer_id, password } = body;

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user: CreateUser = {
        name,
        email,
        employer_id,
        password: hashPassword,
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
        name,
        email,
        employer_id,
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

    const coachBooking: CoachBooking = {
      user_id,
      coach_id,
      invitee_email,
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
        throw new Error("Unable to create new User");
      });

    const coach: Coach[] = await db("coaches").where({
      id: booking[0].coach_id,
    });

    mixpanelEvent("Coach Booked", {
      distinct_id: booking[0].user_id,
      "User ID": booking[0].user_id,
      "Coach ID": booking[0].coach_id,
      "Coach Name": coach[0].name,
      "Booking Email": booking[0].invitee_email,
      Name: booking[0].invitee_full_name,
      "Invitee UUID": booking[0].invitee_uuid,
      "Event End Time": booking[0].event_end_time,
      "Event Start Time": booking[0].event_start_time,
      "Event Type Name": booking[0].event_type_name,
      "Event Type UUID": booking[0].event_type_uuid,
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
    const { name, email, password, invite_code } = body;

    const employer: Employer = await getEmployerByInvite(invite_code);

    if (!employer) {
      return { message: "Invitation Code not found!" };
    }

    if (employer.invitation_code !== invite_code) {
      return { message: "Invalid Invite Code!" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user: CreateUser = {
      name,
      email,
      employer_id: Number(employer.id),
      password: hashPassword,
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
        "User Name": newUser[0].name,
        "Employer ID": newUser[0].employer_id,
        "Employer Name": employer.name,
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
  try {
    const { id, name, email, employer_id } = body;

    const update: User[] | { message: string } = await db("users")
      .where({ id })
      .update({
        name,
        email,
        employer_id,
        updated_at: moment().toISOString(),
      })
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          return {
            message: "User email is already being used",
          };
        } else {
          throw new Error("Unable to edit User");
        }
      });

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
  const user: User = await db("users").select().where({ email }).first();

  if (!user) {
    return { message: "Username or Password does not match" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    await db("users").update({ last_sign_in: db.fn.now() });

    const loggedInUser: Partial<User> = {
      id: user.id,
      name: user.name,
      email: user.email,
      employer_id: user.employer_id,
      last_sign_in: user.last_sign_in,
    };

    return loggedInUser;
  } else {
    return { message: "Username or Password does not match" };
  }
};
