import Meal from "./components/Meal";
import TotalCalories from "./components/TotalCalories";
import useFetch from "./hooks/useFetch";
import { Record as RecordInterface } from "./types";
import calcTotalNutrition from "./utils/calcTotalNutrition";
function App() {
  const currDateStr = "2022-10-10";
  const { data: records } = useFetch<RecordInterface[]>(
    `http://localhost:5000/records?date=${currDateStr}`
  );
  const {
    fats: totalFats,
    carbs: totalCarbs,
    proteins: totalProteins,
  } = calcTotalNutrition(records);
  return (
    <div className="App">
      <div className="container">
        <h1>Calorie counter</h1>
        <div className="day-calories-container">
          <div className="meals-wrapper">
            {records && (
              <>
                <Meal
                  title="Breakfast"
                  records={records?.filter(
                    (record) => record.meal_type === "Breakfast"
                  )}
                />
                <Meal
                  title="Lunch"
                  records={records?.filter(
                    (record) => record.meal_type === "Lunch"
                  )}
                />
                <Meal
                  title="Dinner"
                  records={records?.filter(
                    (record) => record.meal_type === "Dinner"
                  )}
                />
              </>
            )}
          </div>
          <div className="total-calories-wrapper">
            <TotalCalories {...{ totalCarbs, totalFats, totalProteins }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
