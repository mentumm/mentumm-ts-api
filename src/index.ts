import express, { Express, Request, Response } from "express";
import cors, { CorsRequest } from "cors";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import helmet from "helmet";

import usersRouter from "./routes/users.routes";
import employersRouter from "./routes/employers.routes";
import coachesRouter from "./routes/coaches.routes";
import tagsRouter from "./routes/tags.routes";
import actionPlansRouter from "./routes/actionPlans.routes";
import { tokenRouter } from "./routes/tokens.routes";
import workshopsRouter from "./routes/workshop.routes";

const app: Express = express();
app.use(helmet());

const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      issuer: "growth10",
      audience: "portal.mentumm.com",
      ignoreExpiration: false,
    },
    function (jwt_payload, done) {
      return done(null, {});
    }
  )
);

app.options("*", cors<CorsRequest>());

app.get("/health", (req: Request, res: Response) => {
  res.send("We're a healthy boi");
});

app.use("/v1", actionPlansRouter);
app.use("/v1", coachesRouter);
app.use("/v1", employersRouter);
app.use("/v1", tagsRouter);
app.use("/v1", tokenRouter);
app.use("/v1", usersRouter);
app.use("/v1", workshopsRouter);

app.listen(port, () => {
  console.log(`Mentumm API listening on ${port}`);
});
