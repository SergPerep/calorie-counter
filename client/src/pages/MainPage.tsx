import Meal from "../components/Meal";
import TotalCalories from "../components/TotalCalories";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import formatDateStrToReadable from "../utils/formatDateStrToReadable";
const MainPage = () => {
  const { dateStr: currDateStr } = useParams();
  return (
    <>
      <Nav selectedDateStr={currDateStr || ""} />
      <main>
        <div className="container">
          <h1>{currDateStr && formatDateStrToReadable(currDateStr)}</h1>
          <div className="day-calories-container">
            <div className="meals-wrapper">
              <Meal title="Breakfast" mealType="breakfast" />
              <Meal title="Lunch" mealType="lunch" />
              <Meal title="Dinner" mealType="dinner" />
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
