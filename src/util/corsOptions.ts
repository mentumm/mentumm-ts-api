import { CorsOptions } from "cors";

const NODE_ENV = process.env.NODE_ENV;

const privateWhitelist = [
  "https://*.mentumm.com",
  "https://mentumm.com",
  "https://mentumm-portal-staging.onrender.com",
  NODE_ENV === "development" && "http://localhost:3000",
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
