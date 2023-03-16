import express, { Request, Response } from "express";
import { styleTypes } from "../controllers/style_types.controller";
import cors from "cors";
import passport from "passport";
import { privateCorsConfig } from "../util/corsOptions";

const styleTagsRouter = express.Router();

styleTagsRouter.get(
  "/style_types",
  cors(privateCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req: Request, res: Response) => await styleTypes(req, res)
);

export default styleTagsRouter;
