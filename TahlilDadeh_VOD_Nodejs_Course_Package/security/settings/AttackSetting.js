import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import hpp from "hpp";
import csurf from "csurf";

const ddosLimit = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "برو یه ربع دیگه بیا",
  });
};

const mongoSanitizer = () => {
  return mongoSanitize();
};

const httpProtection = () => {
  return helmet();
};

const xssProtection = () => {
  return xss();
};

const hppProtection = () => {
  return hpp();
};

const csrfProtection = () => {
  return csurf({ cookie: true });
};

export const AttackSetting = {
  ddosLimit,
  mongoSanitizer,
  httpProtection,
  xssProtection,
  hppProtection,
  csrfProtection,
};
