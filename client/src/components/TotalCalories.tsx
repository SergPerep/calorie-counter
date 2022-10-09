import calcEnergy from "../utils/calcEnergy";
import roundNumber from "../utils/roundNumber";

const TotalCalories = ({
  totalFats,
  totalCarbs,
  totalProteins,
}: {
  totalFats: number;
  totalCarbs: number;
  totalProteins: number;
}) => {
  const totalEnergy = calcEnergy(totalFats, totalCarbs, totalProteins);
  return (
    <div className="total-calories">
      <h2>Total</h2>
      <span className="total-energy">{roundNumber(totalEnergy, 0)} kcal</span>
      <div className="total-nutrition">
        <span className="fats"> Fats: {roundNumber(totalFats, 0)} g</span>
        <span className="carbs">Carbs: {roundNumber(totalCarbs, 0)} g</span>
        <span className="proteins">
          Proteins: {roundNumber(totalProteins, 0)} g
        </span>
      </div>
    </div>
  );
};

export default TotalCalories;
