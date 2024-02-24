
export const calculateService = ({ first_num, second_num }, calculationMethod) => {
  let result;
  switch (calculationMethod) {
    case "+":
      result = first_num + second_num;
      break;
    case "-":
      result = first_num - second_num;
      break;
    case "*":
      result = first_num * second_num;
      break;
    case "/":
      result = first_num / second_num;
      break;
    default:
      return;
  }
  return result;
};
