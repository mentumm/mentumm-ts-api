import { Request, Response } from "express";
import { ClientAdmin, RegisterClientAdmin } from "../models/clientAdmin.model";
import { createClientAdmin, getClientAdmin } from "../services/clientAdmin.service";


export const clientAdmin = async (req: Request, res: Response) => {
  const { id, name, email, employer_id, limit } = req.query;

  try {
    const clientAdmin = await getClientAdmin(
      Number(id),
      name as string,
      email as string,
      Number(employer_id),
      limit ? Number(limit) : 100
    );

    return res.json(clientAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export const newClientAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: RegisterClientAdmin = req.body;

  try {
    if (body.invite_code !== '1Admin%Register$') {
      throw new Error("Invalid invite code.");
    }

    const coach = await createClientAdmin(body);

    return res.json(coach);
  } catch (error) {
    return res.status(500).send(error);
  }
};