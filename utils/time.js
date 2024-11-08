const moment = require("moment");

function isBetweenTodayAndTomorrow(date) {
  const targetDate = moment.utc(date, "MM/DD/YYYY"); // Parse the target date as UTC
  const now = moment.utc().startOf("day"); // Current date and time in UTC
  const dayAfterTomorrow = moment.utc().add(2, "day").startOf("day");

  if (
    (targetDate.isSame(now, "day") || targetDate.isAfter(now, "hour")) &&
    targetDate.isBefore(dayAfterTomorrow)
  ) {
    return true;
  }
  return false;
}

function isToday(date) {
  const targetDate = moment.utc(date, "MM/DD/YYYY"); // Parse the target date as UTC
  const now = moment.utc().startOf("day"); // Current date and time in UTC
  const tomorrow = moment.utc().add(1, "day").startOf("day"); // Start of tomorrow in UTC

  if (
    (targetDate.isSame(now, "day") || targetDate.isAfter(now)) &&
    targetDate.isBefore(tomorrow)
  ) {
    return true;
  }
  return false;
}

module.exports = { isToday, isBetweenTodayAndTomorrow };
