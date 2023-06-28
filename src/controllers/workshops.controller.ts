import { Request, Response } from "express";
import {
  getWorkshops,
  getWorkshopsBySlug,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
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

export const create = async (req: Request, res: Response) => {
  try {
    const workshop = await createWorkshop(req.body);
    if (!workshop) {
      return res.status(400).send("Workshop could not be created");
    }
    return res.status(201).send(workshop);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workshop = await updateWorkshop(Number(id), req.body);
    if (!workshop) {
      return res.status(400).send("Workshop could not be updated");
    }
    return res.status(200).send(workshop);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workshop = await deleteWorkshop(Number(id));
    if (!workshop) {
      return res.status(400).send("Workshop could not be deleted");
    }
    return res.status(200).send(workshop);
  } catch (error) {
    return res.status(500).send(error);
  }
};
