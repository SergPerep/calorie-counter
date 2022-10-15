const genPortionSizeError = (value: number | undefined): string => {
  if (typeof value !== "number") value = 0;
  if (value < 0) return "Cannot be less than 0";
  if (value >= 1000) return "More than 1 kg? Do you really need that much?";
  return "";
};

export default genPortionSizeError;
