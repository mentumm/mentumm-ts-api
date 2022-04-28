import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import { CreateEmployer, Employer } from "../models/employers.model";
import { KnexError } from "../types";

export const getEmployers = async (
  id: number,
  name: string,
  max_employees: number,
  invitation_code: string
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
      }
    })
    .returning("*");

  return employer;
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

export const deleteEmployer = async (
  id: number
): Promise<Employer[] | KnexError> => {
  // TODO: will need to come back and cycle thru Users before deactivating Employer

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
