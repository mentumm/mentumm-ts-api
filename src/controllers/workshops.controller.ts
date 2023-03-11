import { Request, Response } from "express";
import { getWorkshops } from "../services/workshops.service";

export const workshops = async (req: Request, res: Response) => {
  try {
    const workshops = await getWorkshops();

    return res.json(workshops);
  } catch (error) {
    return res.status(500).send(error);
  }
};
