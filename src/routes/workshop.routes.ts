import express, { Request, Response } from "express";
import { workshops } from "../controllers/workshops.controller";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";

const workshopsRouter = express.Router();

workshopsRouter.get(
  "/workshops",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await workshops(req, res)
);

export default workshopsRouter;
