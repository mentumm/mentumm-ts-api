import express, { Request, Response } from "express";
import { workshops, workshop } from "../controllers/workshops.controller";
import cors from "cors";
import passport from "passport";
import { privateCorsConfig } from "../util/corsOptions";

const workshopsRouter = express.Router();

workshopsRouter.get(
  "/workshops",
  cors(privateCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req: Request, res: Response) => await workshops(req, res)
);

workshopsRouter.get(
  "/workshops/:slug",
  cors(privateCorsConfig),
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req: Request, res: Response) => await workshop(req, res)
);

export default workshopsRouter;
