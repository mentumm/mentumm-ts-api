import { Knex } from "knex";
import db from "../database/db";
import bcrypt from "bcrypt";
import moment from "moment";
import { CreateUser, UpdateUser, User } from "../models/users.model";
import { KnexError } from "../types";

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
