import Icon from "../BaseUI/Icon";
import date from "date-and-time";
import Calendar from "./Calendar";
import useClickOutside from "../../hooks/useClickOutside";

const CalDropDown = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const handleClickDisplay = () => setIsCalendarOpen(!isCalendarOpen);
  const {
    ref: calendarDropdownEl,
    isOpen: isCalendarOpen,
    setIsOpen: setIsCalendarOpen,
  } = useClickOutside<HTMLDivElement>();
  return (
    <div className="calendar-dropdown" ref={calendarDropdownEl}>
      <button
        className="calendar-dropdown__display"
        onClick={handleClickDisplay}
      >
        <span className="text">
          {date.transform(selectedDateStr, "YYYY-MM-DD", "DD MMM YYYY")}
        </span>
        <Icon name="arrow_drop_down" />
      </button>
      {isCalendarOpen && <Calendar selectedDateStr={selectedDateStr} />}
    </div>
  );
};

export default CalDropDown;
