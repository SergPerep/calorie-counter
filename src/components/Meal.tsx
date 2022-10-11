import { MealType } from "../types";
import Record from "./Record";
import roundNumber from "../utils/roundNumber";
import calcTotalNutritionForRecords from "../utils/calcTotalNutritionForRecords";
import AddButtonBtn from "./AddRecordsBtn";
import { ReactComponent as MoonSVG } from "../assets/Moon.svg";
import { ReactComponent as SunriseSVG } from "../assets/Sunrise.svg";
import { ReactComponent as SunSVG } from "../assets/Sun.svg";
import Spinner from "./BaseUI/Spinner";
import { useContext } from "react";
import { RecordsContext } from "../contexts/RecordsContext";

const Meal = ({ title, mealType }: { title: string; mealType: MealType }) => {
  const { records, areRecordsLoading } = useContext(RecordsContext);
  const { totalFatsNum, totalCarbsNum, totalProteinsNum, totalEnergyNum } =
    calcTotalNutritionForRecords(records);
  return (
    <div className="meal">
      <div className="meal_header">
        <div className="meal-icon">
          {mealType === "breakfast" && <SunriseSVG />}
          {mealType === "lunch" && <SunSVG />}
          {mealType === "dinner" && <MoonSVG />}
        </div>
        <div className="meal_title">{title}</div>
      </div>
      <div className="meal_body">
        {areRecordsLoading && <Spinner />}
        {!areRecordsLoading && records && (
          <>
            <AddButtonBtn mealType={mealType} />
            {records
              .filter((record) => record.meal_type === mealType)
              .map((record) => (
                <Record key={record.id} record={record} />
              ))}
          </>
        )}
      </div>
      <div className="meal_footer">
        <div className="nutrition">
          <span className="fats">Fats: {roundNumber(totalFatsNum, 2)} g</span>
          <span className="carbs">
            Carbs: {roundNumber(totalCarbsNum, 2)} g
          </span>
          <span className="proteins">
            Proteins: {roundNumber(totalProteinsNum, 2)} g
          </span>
        </div>
        <span className="energy">{roundNumber(totalEnergyNum, 0)} kcal</span>
      </div>
    </div>
  );
};

export default Meal;
