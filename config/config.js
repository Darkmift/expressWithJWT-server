import dotenv from "dotenv";

dotenv.config({ encoding: "utf8" });

export const PORT = process.env.PORT || 4000;
export const tokenSecret = process.env.TOKEN_SECRET || "mySecret";
export const refreshTokenSecret = process.env.REFRESH_TOKEN || "myRefresh";
export const cookieSecret = process.env.COOKIE_SECRET || "myCookie";
