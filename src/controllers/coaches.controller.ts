import { Request, Response } from "express";
import {
  createCoach,
  createCoachRating,
  deleteCoach,
  getCoaches,
  updateCoach,
} from "../services/coaches.service";
import { RegisterCoach } from "../models/coaches.model";

export const coaches = async (req: Request, res: Response) => {
  const { id, limit, search } = req.query;

  try {
    const coach = await getCoaches(
      Number(id),
      limit ? Number(limit) : 100,
      search as string
    );

    return res.json(coach);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const newCoach = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: RegisterCoach = req.body;

  try {
    if (body.invite_code !== 'Coach10Register23') {
      throw new Error("Invalid invite code.");
    }

    const coach = await createCoach(body);

    return res.json(coach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deactivateCoach = async (req: Request, res: Response) => {
  const id = req.query.id;

  try {
    const coach = await deleteCoach(Number(id));

    return res.json(coach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateCoachInfo = async (req: Request, res: Response) => {
  try {
    const updatedCoach = await updateCoach(req.body);

    return res.json(updatedCoach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const addCoachRating = async (req: Request, res: Response) => {
  try {
    const coachRating = await createCoachRating(req.body);

    return res.json(coachRating);
  } catch (error) {
    return res.status(500).send(error);
  }
};
