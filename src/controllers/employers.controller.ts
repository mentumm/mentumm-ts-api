import { Request, Response } from "express";
import { CreateEmployer } from "../models/employers.model";
import {
  createEmployer,
  deleteEmployer,
  getEmployers,
  updateEmployer,
} from "../services/employers.service";

export const employers = async (req: Request, res: Response) => {
  const { id, name, max_employees, invitation_code, limit } = req.query;

  try {
    const employer = await getEmployers(
      Number(id),
      name as string,
      Number(max_employees),
      invitation_code as string,
      limit ? Number(limit) : 100
    );

    return res.json(employer);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const newEmployer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: CreateEmployer = req.body;

  try {
    const employer = await createEmployer(body);

    return res.json(employer);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deactivateEmployer = async (req: Request, res: Response) => {
  const id = req.query.id;

  try {
    const employer = await deleteEmployer(Number(id));

    return res.json(employer);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateEmployerInfo = async (req: Request, res: Response) => {
  try {
    const updatedEmployer = await updateEmployer(req.body);

    return res.json(updatedEmployer);
  } catch (error) {
    return res.status(500).send(error);
  }
};
