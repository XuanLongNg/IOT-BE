import {
  format,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from "date-fns";

export const Format_HH_mm_ss = (date: string) => {
  const newDate = new Date(date);
  // console.log("Old date: ", date);
  // console.log("New date: ", newDate);

  const time = format(newDate, "HH:mm:ss");
  const hours = getHours(newDate),
    minutes = getMinutes(newDate),
    seconds = getSeconds(newDate);
  return {
    time,
    hours,
    minutes,
    seconds,
  };
};

export const Format_YYYY_MM_DD_HH_mm_ss = (date: string) => {
  const newDate = new Date(date);
  // console.log("Old date: ", date);
  // console.log("New date: ", newDate);

  const time = format(newDate, "yyyy-MM-dd HH:mm:ss");
  const years = getYear(newDate),
    months = getMonth(newDate),
    days = getDay(newDate),
    hours = getHours(newDate),
    minutes = getMinutes(newDate),
    seconds = getSeconds(newDate);

  return {
    time,
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};
