import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model";
import { authenticateUser } from "./users.service";

const JWT_SECRET = process.env.JWT_SECRET || null;

export const generateJWT = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const { email, password, id } = req.body;

  try {
    if (!JWT_SECRET) {
      throw new Error("No JWT Secret found, bailing...");
    }

    const user = (await authenticateUser(email, password)) as User;

    if (!user.id) {
      throw new Error("No user found, will not generate JWT");
    }

    const token = jwt.sign({}, JWT_SECRET, {
      expiresIn: "48h",
      issuer: "growth10",
      audience: "portal.mentumm.com",
    });

    return res.status(200).json(token);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
