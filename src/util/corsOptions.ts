import { CorsOptions } from "cors";

const privateWhitelist = [
  "https://*.mentumm.com",
  "https://mentumm.com",
  "https://mentumm-portal-staging.onrender.com",
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
