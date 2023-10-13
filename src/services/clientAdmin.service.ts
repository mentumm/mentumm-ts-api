import { Knex } from "knex";
import moment from "moment";
import db from "../database/db";
import bcrypt from "bcrypt";
import { mixpanelEvent } from "../helpers/mixpanel";
import { ClientAdmin, RegisterClientAdmin } from "../models/clientAdmin.model";
import { emailService, EmailTemplate } from "../helpers/emailService";
import { KnexError } from "../types";

export const createClientAdmin = async (
  body: RegisterClientAdmin
): Promise<ClientAdmin[] | KnexError> => {
  const { first_name, last_name, email, password, is_test } = body;
  try {
    let errors = null;
    const lowercaseEmail = email.toLowerCase();

    const hashPassword = await bcrypt.hash(password, 10);
    const clientAdmin: Partial<ClientAdmin> = {
      first_name,
      last_name,
      email: lowercaseEmail,
      password: hashPassword,
      role: 'clientAdmin',
      is_test: is_test || false,
    };

    const newClientAdmin: ClientAdmin[] = await db("users")
      .insert(clientAdmin)
      .returning("*")
      .catch((err: Error) => {
        if (err) {
          console.log(err);
          errors = { message: "User email address is already being used" };
          return [];
        } else {
          throw new Error("Unable to create new Client Admin User");
        }
      });

    if (errors) {
      return errors;
    } else {

      mixpanelEvent("New Client Admin Registered", {
        distinct_id: newClientAdmin[0].id,
        "Client Admin ID": newClientAdmin[0].id,
        "Client Admin First Name": newClientAdmin[0].first_name,
        "Client Admin Last Name": newClientAdmin[0].last_name,
      });

      emailService.send(EmailTemplate.COACH_WELCOME, newClientAdmin[0].email, {
        first_name: newClientAdmin[0].first_name,
      });

      return newClientAdmin;
    }
  } catch (error) {
    throw new Error("Unable to register new Client Admin");
  }
};

export const getClientAdmin = async (
  id: number,
  name: string,
  email: string,
  employer_id: number,
  limit: number,
): Promise<ClientAdmin[] | KnexError> => {
  const clientAdmin = await db("users")
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

  return clientAdmin;
};