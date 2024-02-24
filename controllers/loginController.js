// constants
import { COOKIE_MAX_AGE_LIFE_IN_SECONDS } from "../constants/consts.js";

// services
import { setAuthCookie } from "../services/authServices.js";

// validators and utils
import { serverResponse } from "../utils/serverResponse.js";
import { validateUser } from "../validators/validateUserCredentials.js";

export const login = (req, res) => {
  try {
    // shallow copy of the body fro mthe request
    const loginForm = { ...req.body };
    // validate the user credentials
    const validUser = validateUser(loginForm);

    if (validUser) {
      // check whether the password is correct
      const isPasswordValid = validUser.password === loginForm.password;

      if (isPasswordValid) {
        // create the token itself and extract the cookie itself
        const cookieToken = setAuthCookie(validUser.username);
        res.cookie("token", cookieToken, {
          httpOnly: true,
          maxAge: COOKIE_MAX_AGE_LIFE_IN_SECONDS,
        });

        return serverResponse(res, 200, { status: "Signed in successfully" });
      } else {
        serverResponse(res, 400, { message: "Password is incorrect" });
      }
    } else {
      // no such user in the DB
      return serverResponse(res, 400, {
        message: "Wrong credentials, no such user with the specified username",
      });
    }
  } catch (e) {
    // internal error occurred
    return serverResponse(res, 500, { message: e.message });
  }
};
