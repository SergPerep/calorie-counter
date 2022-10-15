import date from "date-and-time";
import { todayStr, tomorrowStr } from "./days";
const formatDateStrToReadable = (dateStr: string) => {
  if (dateStr === todayStr) return "Today";
  if (dateStr === tomorrowStr) return "Tomorrow";
  return date.transform(dateStr, "YYYY-MM-DD", "DD MMM YYYY");
};

export default formatDateStrToReadable;
