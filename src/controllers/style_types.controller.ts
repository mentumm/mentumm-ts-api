import { Request, Response } from "express";
import {
  getStyleTypes,
  createUserStyleType,
  deleteUserStyleTypes,
} from "../services/style_types.service";

export const styleTypes = async (req: Request, res: Response) => {
  try {
    const styleTypes = await getStyleTypes();

    return res.json(styleTypes);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createUserStyleTypes = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const style_types = req.body.style_types;

  try {
    await deleteUserStyleTypes(user_id);

    await Promise.all(
      // @ts-ignore
      style_types.map((styleTypeId) =>
        createUserStyleType(user_id, styleTypeId)
      )
    );

    return res.json({ sucess: true });
  } catch (error) {
    return res.status(500).send(error);
  }
};
