import express, { Express, Request, Response } from "express";
import cors, { CorsRequest } from "cors";
import rulingsRouter from "./routes/users.routes";

const app: Express = express();

const port = process.env.PORT || 3001;

app.options("*", cors<CorsRequest>());

app.get("/health", (req: Request, res: Response) => {
  res.send("We're a healthy boi");
});

app.use("/v1", rulingsRouter);

app.listen(port, () => {
  console.log(`99-Staples API listening on ${port}`);
});
