// validators and utils
import { serverResponse } from "../utils/serverResponse.js";
import { validateCalc } from "../validators/validateCalculationAuthencity.js";

// services
import { calculateService } from "../services/calculateServices.js";

export const calculate = (req, res) => {
  try {
    // shallow copy of the body from the request
    const numbersObject = { ...req.body };
    // extract the calculation Method header
    const xCalculationMethodHeader = req.get("X-Calculation-Method");
    // check whether the parameters are valid and return an answer
    return validateCalc(numbersObject, xCalculationMethodHeader)
      ? serverResponse(res, 200, {
          result: calculateService(numbersObject, xCalculationMethodHeader),
        })
      : serverResponse(res, 400, {
          message:
            "Atleast one of the numbers that was suposed to be provided is NaN or the calculation method you provided is illegal",
        });
  } catch (e) {
    // internal error occurred
    return serverResponse(res, 500, { message: e.message });
  }
};
