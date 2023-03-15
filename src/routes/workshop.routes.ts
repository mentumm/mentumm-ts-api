import express, { Request, Response } from "express";
import { workshops } from "../controllers/workshops.controller";
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

export default workshopsRouter;
