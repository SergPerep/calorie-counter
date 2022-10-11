import { Record } from "../types";
import calcEnergy from "./calcEnergy";
const calcTotalNutritionForRecords = (records: Record[] | undefined) => {
  if (!records)
    return {
      totalFatsNum: undefined,
      totalCarbsNum: undefined,
      totalProteinsNum: undefined,
      totalEnergyNum: undefined,
    };
  const nutrition = records.reduce(
    (prevVal, currVal) => {
      const recordFatsNum = (currVal.fats_per_100 / 100) * currVal.quantity;
      const recordCarbsNum = (currVal.carbs_per_100 / 100) * currVal.quantity;
      const recordProteinsNum =
        (currVal.proteins_per_100 / 100) * currVal.quantity;
      return {
        totalFatsNum: prevVal.totalFatsNum + recordFatsNum,
        totalCarbsNum: prevVal.totalCarbsNum + recordCarbsNum,
        totalProteinsNum: prevVal.totalProteinsNum + recordProteinsNum,
      };
    },
    { totalFatsNum: 0, totalCarbsNum: 0, totalProteinsNum: 0 }
  );
  const totalEnergyNum = calcEnergy(
    nutrition.totalFatsNum,
    nutrition.totalCarbsNum,
    nutrition.totalProteinsNum
  );
  return { ...nutrition, totalEnergyNum };
};

export default calcTotalNutritionForRecords;
