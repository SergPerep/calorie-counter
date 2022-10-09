import Icon from "../BaseUI/Icon";
import date from "date-and-time";
import Calendar from "./Calendar";
import { useEffect, useRef, useState } from "react";

const CalDropDown = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleClickDisplay = () => setIsCalendarOpen(!isCalendarOpen);
  const calendarDropdownEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickDocument = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        calendarDropdownEl.current &&
        !calendarDropdownEl.current.contains(target)
      )
        setIsCalendarOpen(false);
    };
    if (isCalendarOpen) document.addEventListener("click", handleClickDocument);
    return () => {
      document.removeEventListener("click", handleClickDocument);
    };
  }, [isCalendarOpen]);
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
