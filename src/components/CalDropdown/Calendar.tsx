import makeDaysToDisplay from "./makeDaysToDisplay";
import date from "date-and-time";
import Icon from "../BaseUI/Icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Calendar = ({ selectedDateStr }: { selectedDateStr: string }) => {
  const [startOfTheMonthStr, setStartOfTheMonthStr] = useState("2022-10-01");
  // const [selectedDayStr, setSelectedDayStr] = useState("2022-10-10");
  const navigate = useNavigate();
  // Just names of days of the week for render
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const daysToDisplay = makeDaysToDisplay(startOfTheMonthStr);

  const moveMonth = (monthOffsetNum: number) => {
    const startOfTheMonthDate = new Date(startOfTheMonthStr);
    const updatedStartOfTheMonthDate = date.addMonths(
      startOfTheMonthDate,
      monthOffsetNum
    );
    const updatedStartOfTheMonthStr = date.format(
      updatedStartOfTheMonthDate,
      "YYYY-MM-DD"
    );
    setStartOfTheMonthStr(updatedStartOfTheMonthStr);
  };

  const handleClickDay = (dayDate: Date) => {
    const dayStr = date.format(dayDate, "YYYY-MM-DD");
    navigate(`/${dayStr}`);
    // window.location.reload();
  };

  const currMonthStr = date.transform(
    startOfTheMonthStr,
    "YYYY-MM-DD",
    "MMMM YYYY"
  );
  return (
    <div className="calendar">
      <div className="calendar_controls">
        <button onClick={() => moveMonth(-1)}>
          <Icon name="chevron_left" />
        </button>
        <div className="month-display">{currMonthStr}</div>
        <button onClick={() => moveMonth(1)}>
          <Icon name="chevron_right" />
        </button>
      </div>
      <div className="calendar_weekdays">
        {weekDays.map((weekDayStr, index) => (
          <span key={index}>{weekDayStr}</span>
        ))}
      </div>
      <div className="calendar_days">
        {daysToDisplay.map((day, index) => {
          const dayStr = date.format(day.dateObj, "YYYY-MM-DD");
          const isSelected = dayStr === selectedDateStr;
          return (
            <button
              key={dayStr}
              onClick={() => handleClickDay(day.dateObj)}
              className={`${isSelected ? "selected" : ""} ${
                day.isThisMonth ? "this-month" : ""
              } ${day.isToday ? "today" : ""}
          `}
            >
              <div className="circle">{day.dateObj.getDate()}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
