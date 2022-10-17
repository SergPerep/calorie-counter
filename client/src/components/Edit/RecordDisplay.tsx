import roundNumber from "../../utils/roundNumber";
import NutritionBar from "../NutritionBar";
import NutritionLegend from "../NutritionLegend";
import calcTotalNutrition from "../../utils/calcTotalNutrition";
import { SizeUnit } from "../../types";
const RecordDisplay = ({
  nameStr,
  selectedPerValue,
  fatsPer100Num,
  carbsPer100Num,
  proteinsPer100Num,
  portionSizeNum,
}: {
  nameStr: string | undefined;
  selectedPerValue: SizeUnit;
  fatsPer100Num: number | undefined;
  carbsPer100Num: number | undefined;
  proteinsPer100Num: number | undefined;
  portionSizeNum: number | undefined;
}) => {
  const { totalFatsNum, totalCarbsNum, totalProteinsNum, totalEnergy } =
    calcTotalNutrition(
      { fatsPer100Num, carbsPer100Num, proteinsPer100Num },
      portionSizeNum
    );
  return (
    <div className="edit-record-display">
      <div className="edit-record-display__header">
        <span>{nameStr || "Food name"}</span>
        <span>
          {roundNumber(portionSizeNum, 2) || 0} {selectedPerValue}
        </span>
      </div>
      <div className="edit-record-display__energy">
        {roundNumber(totalEnergy, 0)} kcal
      </div>
      <NutritionBar
        fatsNum={roundNumber(totalFatsNum, 2)}
        carbsNum={roundNumber(totalCarbsNum, 2)}
        proteinsNum={roundNumber(totalProteinsNum, 2)}
      />
      <NutritionLegend
        fatsNum={roundNumber(totalFatsNum, 2)}
        carbsNum={roundNumber(totalCarbsNum, 2)}
        proteinsNum={roundNumber(totalProteinsNum, 2)}
      />
    </div>
  );
};
export default RecordDisplay;
