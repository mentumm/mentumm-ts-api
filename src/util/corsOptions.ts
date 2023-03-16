import { CorsOptions } from "cors";

const NODE_ENV = process.env.NODE_ENV;
const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL ?? false;

const privateWhitelist = [
  "https://*.mentumm.com",
  "https://mentumm.com",
  "https://mentumm-portal-staging.onrender.com",
  NODE_ENV === "staging" ? RENDER_EXTERNAL_URL : false,
  NODE_ENV === "development" ? "http://localhost:3000" : false,
];

export const publicCorsConfig: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};

export const privateCorsConfig: CorsOptions = {
  origin: privateWhitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};
