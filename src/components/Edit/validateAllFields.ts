const validateAllFields = ({
  nameStr,
  isFatsInputValid,
  fatsPer100Num,
  isCarbsInputValid,
  carbsPer100Num,
  isProteinsInputValid,
  proteinsPer100Num,
  isPortionSizeInputValid,
  portionSizeNum,
}: {
  nameStr: string | undefined;
  isFatsInputValid: boolean;
  fatsPer100Num: number | undefined;
  isCarbsInputValid: boolean;
  carbsPer100Num: number | undefined;
  isProteinsInputValid: boolean;
  proteinsPer100Num: number | undefined;
  isPortionSizeInputValid: boolean;
  portionSizeNum: number | undefined;
}) => {
  // NAME FIELD
  const isNameStrValid = nameStr ? true : false;

  // FATS FIELD
  const areFatsValid =
    isFatsInputValid && typeof fatsPer100Num === "number" ? true : false;

  // CARBS FIELD
  const areCarbsValid =
    isCarbsInputValid && typeof carbsPer100Num === "number" ? true : false;

  // PROTEINS FIELD
  const areProteinsValid =
    isProteinsInputValid && typeof proteinsPer100Num === "number"
      ? true
      : false;

  // CHECK NUTRITION SUM
  const isNutritionSumValid =
    typeof fatsPer100Num === "number" &&
    typeof carbsPer100Num === "number" &&
    typeof proteinsPer100Num === "number" &&
    fatsPer100Num + carbsPer100Num + proteinsPer100Num <= 100
      ? true
      : false;

  // PORTION SIZE
  const isPortionSizeValid =
    isPortionSizeInputValid &&
    typeof portionSizeNum === "number" &&
    portionSizeNum !== 0
      ? true
      : false;

  return (
    isNameStrValid &&
    areFatsValid &&
    areCarbsValid &&
    areProteinsValid &&
    isNutritionSumValid &&
    isPortionSizeValid
  );
};

export default validateAllFields;
