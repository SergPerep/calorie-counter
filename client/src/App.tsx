import Meal from "./components/Meal";
import useFetch from "./hooks/useFetch";
import { Record as RecordInterface } from "./types";
function App() {
  const currDateStr = "2022-10-10";
  const { data: records } = useFetch<RecordInterface[]>(
    `http://localhost:5000/records?date=${currDateStr}`
  );
  console.log(records);
  return (
    <div className="App">
      <div className="container">
        <h1>Calorie counter</h1>
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
    </div>
  );
}

export default App;
