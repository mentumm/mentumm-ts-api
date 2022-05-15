import { CorsOptions } from "cors";

export const publicCorsConfig: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
