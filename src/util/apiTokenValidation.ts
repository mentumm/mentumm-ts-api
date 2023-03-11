import passport from "passport";

export const apiTokenValidation = () =>
  passport.authenticate("jwt", {
    session: false,
  });
