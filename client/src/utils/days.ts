import date from "date-and-time";
export const todayDate = new Date();
export const todayStr = date.format(todayDate, "YYYY-MM-DD");
export const tomorrowDate = date.addDays(todayDate, 1);
export const tomorrowStr = date.format(tomorrowDate, "YYYY-MM-DD");
