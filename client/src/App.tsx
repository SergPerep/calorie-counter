import useFetch from "./hooks/useFetch";
import { Record } from "./types";
function App() {
  const currDateStr = "2022-10-10";
  const { data: records } = useFetch<Record[]>(
    `http://localhost:5000/records?date=${currDateStr}`
  );
  console.log(records);
  return (
    <div className="App">
      <h1>React App</h1>
      {records &&
        records.map((record) => (
          <div className="record" key={record.id}>
            {record.ingredient}
          </div>
        ))}
    </div>
  );
}

export default App;
