import Icon from "./BaseUI/Icon";
import CalDropDown from "./CalDropdown/CalDropdown";
import date from "date-and-time";
import { useNavigate } from "react-router-dom";

const Nav = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const navigate = useNavigate();

  const moveDate = (dayOffsetNum: number) => {
    const selectedDate = new Date(selectedDateStr);
    const updatedSelectedDate = date.addDays(selectedDate, dayOffsetNum);
    const updatedSelectedDateStr = date.format(
      updatedSelectedDate,
      "YYYY-MM-DD"
    );
    navigate(`/${updatedSelectedDateStr}`);
  };
  return (
    <nav>
      <div className="container">
        <CalDropDown selectedDateStr={selectedDateStr} />
        <div className="arrow-buttons">
          <button onClick={() => moveDate(-1)}>
            <Icon name="chevron_left" />
          </button>
          <button onClick={() => moveDate(1)}>
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
