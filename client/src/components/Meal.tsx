import { Record as RecordInterface } from "../types";
import Record from "./Record";
import roundNumber from "../utils/roundNumber";

const Meal = ({
  title,
  records,
}: {
  title: string;
  records: RecordInterface[];
}) => {
  const nutrition = records.reduce(
    (prevVal, currVal) => {
      const fats = (currVal.fats_per_100 / 100) * currVal.quantity;
      const carbs = (currVal.carbs_per_100 / 100) * currVal.quantity;
      const proteins = (currVal.carbs_per_100 / 100) * currVal.quantity;
      return {
        fats: prevVal.fats + fats,
        carbs: prevVal.carbs + carbs,
        proteins: prevVal.proteins + proteins,
      };
    },
    { fats: 0, carbs: 0, proteins: 0 }
  );
  const { fats, carbs, proteins } = nutrition;
  const energy = fats * 9 + carbs * 4 + proteins * 4;
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
