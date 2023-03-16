import { CorsOptions } from "cors";

const NODE_ENV = process.env.NODE_ENV;

export const publicCorsConfig: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};

export const privateCorsConfig: CorsOptions = {
  origin: (origin, callback) => {
    switch (NODE_ENV) {
      case "development":
        callback(null, true);
        break;
      case "staging":
        if (origin) {
          const stagingUrl = new RegExp(
            /https:\/\/mentumm-portal-staging.*\.onrender\.com/
          );

          callback(null, stagingUrl.test(origin));
        } else {
          callback(null, "https://mentumm-api-staging.onrender.com/");
        }
        break;
      default:
        callback(null, "https://mentumm.com");
        break;
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
