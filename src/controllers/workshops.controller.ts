import { Request, Response } from "express";
import {
  getWorkshops,
  getWorkshopsBySlug,
} from "../services/workshops.service";

export const workshops = async (req: Request, res: Response) => {
  try {
    const workshops = await getWorkshops();

    return res.json(workshops);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const workshop = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const workshop = await getWorkshopsBySlug(slug);

    return res.json(workshop);
  } catch (error) {
    return res.status(500).send(error);
  }
};
