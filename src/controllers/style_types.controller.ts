import { Request, Response } from "express";
import { getStyleTypes } from "../services/style_types.service";

export const styleTypes = async (req: Request, res: Response) => {
  try {
    const styleTypes = await getStyleTypes();

    return res.json(styleTypes);
  } catch (error) {
    return res.status(500).send(error);
  }
};
