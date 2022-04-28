import { CorsOptions } from "cors";

export const publicCorsConfig: CorsOptions = {
  origin: "publicWhiteList",
  optionsSuccessStatus: 200,
  credentials: true,
};
