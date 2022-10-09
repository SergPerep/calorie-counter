import { Record } from "../types";
const calcTotalNutrition = (records: Record[] | undefined) => {
  if (!records) return { fats: 0, carbs: 0, proteins: 0 };
  const nutrition = records.reduce(
    (prevVal, currVal) => {
      const fats = (currVal.fats_per_100 / 100) * currVal.quantity;
      const carbs = (currVal.carbs_per_100 / 100) * currVal.quantity;
      const proteins = (currVal.proteins_per_100 / 100) * currVal.quantity;
      return {
        fats: prevVal.fats + fats,
        carbs: prevVal.carbs + carbs,
        proteins: prevVal.proteins + proteins,
      };
    },
    { fats: 0, carbs: 0, proteins: 0 }
  );
  return nutrition;
};
export default calcTotalNutrition;
