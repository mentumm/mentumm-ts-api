import { Request, Response } from "express";
import { CreateCoach } from "../models/coaches.model";
import {
  createCoach,
  createCoachRating,
  deleteCoach,
  getCoaches,
  updateCoach,
} from "../services/coaches.service";

export const coaches = async (req: Request, res: Response) => {
  const { id, name, limit } = req.query;

  try {
    const coach = await getCoaches(
      Number(id),
      name as string,
      limit ? Number(limit) : 100
    );

    return res.json(coach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const newCoach = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: CreateCoach = req.body;

  if (!body || !body.name || !body.booking_link) {
    return res.status(400).send("Missing required body properties");
  }

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
    if (!id) {
      return res.status(400).send("Missing required parameters");
    }

    const coach = await deleteCoach(Number(id));

    return res.json(coach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateCoachInfo = async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.status(400).send("Missing Coach ID");
  }

  try {
    const updatedCoach = await updateCoach(req.body);

    return res.json(updatedCoach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const addCoachRating = async (req: Request, res: Response) => {
  const { user_id, coach_id } = req.body;

  if (!user_id || !coach_id) {
    return res.status(400).send("Missing rating elements");
  }

  try {
    const coachRating = await createCoachRating(req.body);

    return res.json(coachRating);
  } catch (error) {
    return res.status(500).send(error);
  }
};
