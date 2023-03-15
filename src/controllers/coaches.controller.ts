import { Request, Response } from "express";
import { User } from "../models/users.model";
import {
  createCoach,
  createCoachRating,
  deleteCoach,
  getCoaches,
  updateCoach,
} from "../services/coaches.service";

export const coaches = async (req: Request, res: Response) => {
  const { id, name, limit, search } = req.query;

  try {
    const coach = await getCoaches(
      Number(id),
      name as string,
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
  const body: Partial<User> = req.body;

  try {
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
