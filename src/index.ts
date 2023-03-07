import express, { Express, Request, Response } from "express";
import cors, { CorsRequest } from "cors";

import usersRouter from "./routes/users.routes";
import employersRouter from "./routes/employers.routes";
import coachesRouter from "./routes/coaches.routes";
import tagsRouter from "./routes/tags.routes";

const app: Express = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors<CorsRequest>());

app.get("/health", (req: Request, res: Response) => {
  res.send("We're a healthy boi");
});

app.use("/v1", usersRouter);
app.use("/v1", employersRouter);
app.use("/v1", coachesRouter);
app.use("/v1", tagsRouter);

app.listen(port, () => {
  console.log(`Mentumm API listening on ${port}`);
});
