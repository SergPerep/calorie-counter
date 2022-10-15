const validateAllFields = ({
  nameStr,
  fatsPer100Num,
  carbsPer100Num,
  proteinsPer100Num,
  fatsErrStr,
  carbsErrStr,
  proteinsErrStr,
  portionSizeErrStr,
  portionSizeNum,
}: {
  nameStr: string | undefined;
  fatsPer100Num: number | undefined;
  carbsPer100Num: number | undefined;
  proteinsPer100Num: number | undefined;
  fatsErrStr: string;
  carbsErrStr: string;
  proteinsErrStr: string;
  portionSizeErrStr: string;
  portionSizeNum: number | undefined;
}) => {
  // NAME FIELD
  const isNameStrValid = nameStr ? true : false;

  // FATS FIELD
  const areFatsValid =
    !fatsErrStr && typeof fatsPer100Num === "number" ? true : false;

  // CARBS FIELD
  const areCarbsValid =
    !carbsErrStr && typeof carbsPer100Num === "number" ? true : false;

  // PROTEINS FIELD
  const areProteinsValid =
    !proteinsErrStr && typeof proteinsPer100Num === "number" ? true : false;

  // CHECK NUTRIENTS SUM
  const isNutrientsSum =
    typeof fatsPer100Num === "number" &&
    typeof carbsPer100Num === "number" &&
    typeof proteinsPer100Num === "number" &&
    fatsPer100Num + carbsPer100Num + proteinsPer100Num <= 100
      ? true
      : false;

  // PORTION SIZE
  const isPortionSizeValid =
    !portionSizeErrStr &&
    typeof portionSizeNum === "number" &&
    portionSizeNum !== 0
      ? true
      : false;

  return (
    isNameStrValid &&
    areFatsValid &&
    areCarbsValid &&
    areProteinsValid &&
    isNutrientsSum &&
    isPortionSizeValid
  );
};

export default validateAllFields;
