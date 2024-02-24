// constants
import { calculationMethods } from "../constants/consts.js";

export const validateCalc = (numbers, header) =>
  calculationMethods.includes(header) &&
  !isNaN(numbers["first_num"]) &&
  !isNaN(numbers["second_num"]);
