import { ExtractJwt, StrategyOptions } from "passport-jwt";

const JWT_SECRET = process.env.JWT_SECRET || undefined;

export const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: "growth10",
  audience: "portal.mentumm.com",
  ignoreExpiration: false,
};
