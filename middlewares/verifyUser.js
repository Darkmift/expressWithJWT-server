// libraries
import jwt from "jsonwebtoken";
import { cookieSecret } from "../config/config.js";
import { ACCESS_TOKEN_LIFE_IN_MS } from "../constants/consts.js";

export const verifyUser = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, cookieSecret);
      console.log(decoded);
      if (Date.now() - new Date(decoded.created) < ACCESS_TOKEN_LIFE_IN_MS) {
        req.user = decoded;
        next();
      } else {
        res.clearCookie(req.cookies.token);
        throw new Error("Token lifetime is dead");
      }
    } else {
      throw new Error("Invalid token");
    }
  } catch (e) {
    // for debugging purposes
    console.log(e.message);
    // the message to be returned to the client
    return res.status(401).json({ message: "You are not authorized" }).end();
  }
};
