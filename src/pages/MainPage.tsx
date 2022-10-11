import Meal from "../components/Meal";
import TotalCalories from "../components/TotalCalories";
import { useParams } from "react-router-dom";
import date from "date-and-time";
import Nav from "../components/Nav";
import { RecordsContext } from "../contexts/RecordsContext";
import { useContext } from "react";
const MainPage = () => {
  const { dateStr: currDateStr } = useParams();
  const { records } = useContext(RecordsContext);

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
                    mealType="breakfast"
                    records={records?.filter(
                      (record) => record.meal_type === "breakfast"
                    )}
                  />
                  <Meal
                    title="Lunch"
                    mealType="lunch"
                    records={records?.filter(
                      (record) => record.meal_type === "lunch"
                    )}
                  />
                  <Meal
                    title="Dinner"
                    mealType="dinner"
                    records={records?.filter(
                      (record) => record.meal_type === "dinner"
                    )}
                  />
                </>
              )}
            </div>
            <div className="total-calories-wrapper">
              <TotalCalories />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
