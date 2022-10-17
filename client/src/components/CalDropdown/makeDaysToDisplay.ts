import date from "date-and-time";
import { todayDate } from "../../utils/days";

// Makes an array that will be used to render calendar grid

const makeDaysToDisplay = (startOfTheMonthStr: string) => {
  // Trying to find the start of calendar grid
  const startOfTheMonthDate = new Date(startOfTheMonthStr);
  const monthIndex = startOfTheMonthDate.getMonth();
  const weekDayOfStartOfMonthNum = startOfTheMonthDate.getDay();
  const diff = weekDayOfStartOfMonthNum - 1;
  let startOfCalGrid: Date;
  if (diff > 0) {
    // This is tuesday, wednesday, thursday, friday or saturday
    // Get last monday
    startOfCalGrid = date.addDays(startOfTheMonthDate, -diff);
  } else if (diff === 0) {
    // This is monday
    startOfCalGrid = startOfTheMonthDate;
  } else {
    // This is sunday
    // Get last monday
    startOfCalGrid = date.addDays(startOfTheMonthDate, -6);
  }

  // Make an array of dates starting with «the start of calendar grid»
  let arr = [];
  // Calendar going to have 42 cells
  for (let i = 0; i < 42; i++) {
    const dateObj = date.addDays(startOfCalGrid, i);
    const isToday = date.isSameDay(dateObj, todayDate);
    const isThisMonth = dateObj.getMonth() === monthIndex;

    arr.push({
      dateObj, // Date object
      isToday, // Boolean
      isThisMonth, // Boolean
    });
  }
  return arr;
};

export default makeDaysToDisplay;
