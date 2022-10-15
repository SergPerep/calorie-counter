const validateNutrientInput = (
  value: number | undefined
): [boolean, string] => {
  if (typeof value !== "number") value = 0;
  if (value < 0) return [false, "Cannot be less than 0"];
  if (value > 100) return [false, "Cannot be more than 100"];
  return [true, ""];
};

export default validateNutrientInput;
