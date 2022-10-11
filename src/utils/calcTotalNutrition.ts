import calcEnergy from "./calcEnergy";
const calcTotalNutrition = (
  {
    fatsPer100Num,
    carbsPer100Num,
    proteinsPer100Num,
  }: {
    fatsPer100Num: number | undefined;
    carbsPer100Num: number | undefined;
    proteinsPer100Num: number | undefined;
  },
  portionSizeNum: number | undefined
) => {
  let totalFatsNum, totalCarbsNum, totalProteinsNum, totalEnergy;
  if (portionSizeNum === undefined) {
    totalFatsNum = undefined;
    totalCarbsNum = undefined;
    totalProteinsNum = undefined;
    totalEnergy = undefined;
  } else {
    totalFatsNum =
      fatsPer100Num !== undefined
        ? (fatsPer100Num * portionSizeNum) / 100
        : undefined;
    totalCarbsNum =
      carbsPer100Num !== undefined
        ? (carbsPer100Num * portionSizeNum) / 100
        : undefined;
    totalProteinsNum =
      proteinsPer100Num !== undefined
        ? (proteinsPer100Num * portionSizeNum) / 100
        : undefined;
    totalEnergy = calcEnergy(totalFatsNum, totalCarbsNum, totalProteinsNum);
  }
  return { totalFatsNum, totalCarbsNum, totalProteinsNum, totalEnergy };
};
export default calcTotalNutrition;
