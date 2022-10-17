const genNutrientError = (value: number | undefined): string => {
  if (typeof value !== "number") value = 0;
  if (value < 0) return "Cannot be less than 0";
  if (value > 100) return "Cannot be more than 100";
  return "";
};

export default genNutrientError;
