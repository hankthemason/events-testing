import moment from "moment";

const MONTH_ABBREVIATIONS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "june",
  "july",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

// 1 date
const testDates1 = ["2022-12-09"];
// multiple dates with multiple years
const testDates2 = [
  "2021-10-03",
  "2022-11-05",
  "2022-11-10",
  "2022-11-12",
  "2022-12-05",
  "2022-12-06",
];
// multiple dates with 1 year
const testDates3 = [
  "2022-11-05",
  "2022-11-10",
  "2022-11-12",
  "2022-12-05",
  "2022-12-06",
];

const constructDateStrings = (yearsAndMonthsWithEventsObj) => {
  let outputStringArray = [];

  // if we want to return years in addition to rest of the date
  Object.entries(yearsAndMonthsWithEventsObj).forEach(
    ([year, monthsObject]) => {
      Object.entries(monthsObject).forEach(([month, datesArr]) => {
        let fullString;
        if (datesArr.length > 1) {
          const dates = datesArr.slice(0, datesArr.length - 1).join(", ");
          fullString = `${month} ${dates} & ${
            datesArr[datesArr.length - 1]
          }, ${year}`;
        } else {
          fullString = `${month} ${datesArr[0]}, ${year}`;
        }
        outputStringArray.push(fullString);
      });
    }
  );
  return outputStringArray;
};

export const transformDates = (dates, range = "current") => {
  // construct an object that has keys of each unique month
  // and values of all the days with events in that month
  const yearsAndMonthsWithEvents = {};

  dates.forEach((date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = MONTH_ABBREVIATIONS[date.getMonth()];
    const day = date.getUTCDate();
    // check if the object already includes the year

    if (yearsAndMonthsWithEvents[year]) {
      // it already includes the year
      // check if it includes the month
      if (yearsAndMonthsWithEvents[year][month]) {
        // it already includes the month
        // input the day
        yearsAndMonthsWithEvents[year][month].push(day);
      } else {
        // it does not include this month yet
        yearsAndMonthsWithEvents[year][month] = [day];
      }
    } else {
      // it does not include this year yet
      yearsAndMonthsWithEvents[year] = {
        [month]: [day],
      };
    }
  });
  return constructDateStrings(yearsAndMonthsWithEvents, range);
};

export const isCurrent = (date) => {
  if (moment(date).format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD")) {
    return true;
  }
  return false;
};
