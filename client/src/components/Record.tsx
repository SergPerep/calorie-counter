import { Record as RecordInterface } from "../types";
import roundNumber from "../utils/roundNumber";
const Record = ({ record }: { record: RecordInterface }) => {
  const quantity = record.quantity;
  const fats = (record.fats_per_100 / 100) * quantity;
  const carbs = (record.carbs_per_100 / 100) * quantity;
  const proteins = (record.proteins_per_100 / 100) * quantity;
  const energy = fats * 9 + carbs * 4 + proteins * 4;

  return (
    <div className="record" key={record.id}>
      <div className="header">
        <span className="title">{record.ingredient}</span>
        <span className="quantity">{record.quantity} g</span>
      </div>
      <div className="footer">
        <div className="nutrition">
          <span className="fats">Fats: {record.fats_per_100}</span>
          <span className="carbs">Carbs: {record.carbs_per_100}</span>
          <span className="proteins">Proteins: {record.proteins_per_100}</span>
        </div>
        <span className="energy">{roundNumber(energy, 0)} kcal</span>
      </div>
    </div>
  );
};

export default Record;
