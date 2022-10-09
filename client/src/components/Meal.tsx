import { Record as RecordInterface } from "../types";
import Record from "./Record";
import roundNumber from "../utils/roundNumber";
import calcTotalNutrition from "../utils/calcTotalNutrition";
import calcEnergy from "../utils/calcEnergy";

const Meal = ({
  title,
  records,
}: {
  title: string;
  records: RecordInterface[];
}) => {
  const { fats, carbs, proteins } = calcTotalNutrition(records);
  const energy = calcEnergy(fats, carbs, proteins);
  return (
    <div className="meal">
      <div className="meal_header">{title}</div>
      <div className="meal_body">
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
