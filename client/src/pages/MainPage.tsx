import Meal from "../components/Meal";
import TotalCalories from "../components/TotalCalories";
import { useParams } from "react-router-dom";
import { Record as RecordInterface } from "../types";
import calcTotalNutrition from "../utils/calcTotalNutrition";
import date from "date-and-time";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
const MainPage = () => {
  const { dateStr: currDateStr } = useParams();
  const { data: records } = useFetch<RecordInterface[]>(
    `http://localhost:5000/records?date=${currDateStr}`
  );

  const {
    fats: totalFats,
    carbs: totalCarbs,
    proteins: totalProteins,
  } = calcTotalNutrition(records);

  return (
    <>
      <Nav selectedDateStr={currDateStr || ""} />
      <main>
        <div className="container">
          <h1>
            {currDateStr &&
              date.transform(currDateStr, "YYYY-MM-DD", "DD MMMM YYYY")}
          </h1>
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
      </main>
    </>
  );
};

export default MainPage;
