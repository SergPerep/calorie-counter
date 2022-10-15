const genNutrientsSumError = ({
  fatsPer100Num,
  carbsPer100Num,
  proteinsPer100Num,
}: {
  fatsPer100Num: number | undefined;
  carbsPer100Num: number | undefined;
  proteinsPer100Num: number | undefined;
}): string => {
  fatsPer100Num = fatsPer100Num || 0;
  carbsPer100Num = carbsPer100Num || 0;
  proteinsPer100Num = proteinsPer100Num || 0;
  if (fatsPer100Num + carbsPer100Num + proteinsPer100Num > 100)
    return "Sum of nutrients cannot be greater than 100";
  return "";
};

export default genNutrientsSumError;
