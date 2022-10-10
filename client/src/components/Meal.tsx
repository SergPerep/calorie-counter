import { Record as RecordInterface } from "../types";
import Record from "./Record";
import roundNumber from "../utils/roundNumber";
import calcTotalNutrition from "../utils/calcTotalNutrition";
import calcEnergy from "../utils/calcEnergy";
import AddButtonBtn from "./AddRecordsBtn";
import { ReactComponent as MoonSVG } from "../assets/Moon.svg";
import { ReactComponent as SunriseSVG } from "../assets/Sunrise.svg";
import { ReactComponent as SunSVG } from "../assets/Sun.svg";

const Meal = ({
  title,
  records,
  mealType = "breakfast",
}: {
  title: string;
  records: RecordInterface[];
  mealType: "breakfast" | "lunch" | "dinner";
}) => {
  const { fats, carbs, proteins } = calcTotalNutrition(records);
  const energy = calcEnergy(fats, carbs, proteins);
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
        <AddButtonBtn />
        {records.map((record) => (
          <Record key={record.id} record={record} />
        ))}
      </div>
      <div className="meal_footer">
        <div className="nutrition">
          <span className="fats">Fats: {roundNumber(fats, 2)}</span>
          <span className="carbs">Carbs: {roundNumber(carbs, 2)}</span>
          <span className="proteins">Proteins: {roundNumber(proteins, 2)}</span>
        </div>
        <span className="energy">{roundNumber(energy, 0)} kcal</span>
      </div>
    </div>
  );
};

export default Meal;
