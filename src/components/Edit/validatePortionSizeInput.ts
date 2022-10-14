const validatePortionSizeInput = (
  value: number | undefined
): [boolean, string] => {
  if (typeof value !== "number") value = 0;
  if (value < 0) return [false, "Cannot be less than 0"];
  if (value >= 1000)
    return [false, "More than 1 kg? Do you really need that much?"];
  return [true, ""];
};

export default validatePortionSizeInput;
