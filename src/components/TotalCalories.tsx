import calcTotalNutritionForRecords from "../utils/calcTotalNutritionForRecords";
import roundNumber from "../utils/roundNumber";
import { useContext } from "react";
import { RecordsContext } from "../contexts/RecordsContext";

const TotalCalories = () => {
  const { records } = useContext(RecordsContext);

  const { totalFatsNum, totalCarbsNum, totalProteinsNum, totalEnergyNum } =
    calcTotalNutritionForRecords(records);

  return (
    <div className="total-calories">
      <h2>Total</h2>
      <span className="total-energy">
        {roundNumber(totalEnergyNum, 0)} kcal
      </span>
      <div className="total-nutrition">
        <span className="fats"> Fats: {roundNumber(totalFatsNum, 0)} g</span>
        <span className="carbs">Carbs: {roundNumber(totalCarbsNum, 0)} g</span>
        <span className="proteins">
          Proteins: {roundNumber(totalProteinsNum, 0)} g
        </span>
      </div>
    </div>
  );
};

export default TotalCalories;
