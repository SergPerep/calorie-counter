const validateNutritionSum = ({
  fatsPer100Num,
  carbsPer100Num,
  proteinsPer100Num,
}: {
  fatsPer100Num: number | undefined;
  carbsPer100Num: number | undefined;
  proteinsPer100Num: number | undefined;
}): [boolean, string] => {
  fatsPer100Num = fatsPer100Num || 0;
  carbsPer100Num = carbsPer100Num || 0;
  proteinsPer100Num = proteinsPer100Num || 0;
  if (fatsPer100Num + carbsPer100Num + proteinsPer100Num > 100)
    return [true, "Sum of nutrients cannot be greater than 100"];
  return [false, ""];
};

export default validateNutritionSum;
