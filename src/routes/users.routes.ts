import express, { Request, Response } from "express";
import { users } from "../controllers/users.controller";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";

const usersRouter = express.Router();

usersRouter.get(
  "/users",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await users(req, res)
);

export default usersRouter;
