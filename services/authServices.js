// libraries
import jwt from "jsonwebtoken";

// configutrations
import { cookieSecret } from "../config/config.js";

export const setAuthCookie = (username) => {
  const created = Date.now();
  // creating the token
  const cookieToken = jwt.sign(
    {
      username,
      created,
    },
    cookieSecret,
    { expiresIn: "5m" }
  );
  return cookieToken;
};
