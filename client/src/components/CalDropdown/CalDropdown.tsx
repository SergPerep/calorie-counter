import Icon from "../BaseUI/Icon";
import Calendar from "./Calendar";
import useClickOutside from "../../hooks/useClickOutside";
import formatDateStrToReadable from "../../utils/formatDateStrToReadable";

const CalDropDown = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const handleClickDisplay = () => setIsCalendarOpen(!isCalendarOpen);
  const {
    ref: calendarDropdownEl,
    isOpen: isCalendarOpen,
    setIsOpen: setIsCalendarOpen,
  } = useClickOutside<HTMLDivElement>();

  const displayStr = formatDateStrToReadable(selectedDateStr);
  return (
    <div className="calendar-dropdown" ref={calendarDropdownEl}>
      <button
        className="calendar-dropdown__display"
        onClick={handleClickDisplay}
      >
        <span className="text">{displayStr}</span>
        <Icon name="arrow_drop_down" />
      </button>
      {isCalendarOpen && <Calendar selectedDateStr={selectedDateStr} />}
    </div>
  );
};

export default CalDropDown;
