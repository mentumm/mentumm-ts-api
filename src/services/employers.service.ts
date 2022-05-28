import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import {
  CreateEmployer,
  Employer,
  UpdateEmployer,
} from "../models/employers.model";
import { User } from "../models/users.model";
import { KnexError } from "../types";
import { deleteUser } from "./users.service";

export const getEmployers = async (
  id: number | null,
  name: string | null,
  max_employees: number | null,
  invitation_code: string | null,
  limit: number
): Promise<Employer[] | KnexError> => {
  const employer = await db("employers")
    .whereNull("deleted_at")
    .where((builder: Knex.QueryBuilder) => {
      if (id) {
        builder.where({ id: id });
      } else if (name) {
        builder.where({ name: name });
      } else if (max_employees) {
        builder.where({ max_employees: max_employees });
      } else if (invitation_code) {
        builder.where({ invitation_code: invitation_code });
      } else {
        builder.select("*");
      }
    })
    .returning("*")
    .limit(limit);

  return employer;
};

export const getEmployerByInvite = async (
  invitation_code: string
): Promise<Employer> => {
  const employer = await db("employers")
    .whereNull("deleted_at")
    .where({ invitation_code: invitation_code })
    .returning("*");

  return employer[0];
};

export const createEmployer = async (
  body: CreateEmployer
): Promise<Employer[] | KnexError> => {
  try {
    const { name, max_employees, invitation_code } = body;
    const employer: CreateEmployer = {
      name,
      max_employees,
      invitation_code,
    };

    const newEmployer: Employer[] | { message: string } = await db("employers")
      .insert(employer)
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          return { message: "Employer name is already being used" };
        } else {
          throw new Error("Unable to create new Employer");
        }
      });

    return newEmployer;
  } catch (error) {
    throw new Error("Unable to create new Employer");
  }
};

export const updateEmployer = async (
  body: UpdateEmployer
): Promise<Employer[] | KnexError> => {
  try {
    const { id, name, max_employees, invitation_code } = body;

    const update: Employer[] | { message: string } = await db("employers")
      .where({ id })
      .update({
        name,
        max_employees,
        invitation_code,
        updated_at: moment().toISOString(),
      })
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          return {
            message: "Employer name or invitation code is already being used",
          };
        } else {
          throw new Error("Unable to edit Employer");
        }
      });

    return update;
  } catch (error) {
    throw new Error("Unable to edit Employer");
  }
};

export const deleteEmployer = async (
  id: number
): Promise<Employer[] | KnexError> => {
  // if an Employer is deactivated we will deactivate all the Users first
  const users: User[] = await db("users")
    .whereNull("deleted_at")
    .where({ employer_id: id });

  if (users.length > 0) {
    users.map((user: User) => {
      deleteUser(Number(user.id));
    });
  }

  const employer: Employer[] | KnexError = await db("employers")
    .update({
      deleted_at: moment().toISOString(),
      updated_at: moment().toISOString(),
    })
    .where({ id: id })
    .returning("*")
    .catch((err: Error) => {
      if (err) {
        return { message: "There was a problem deactivating this Employer" };
      }
      throw new Error("Unable to deactivate Employer");
    });

  return employer;
};
