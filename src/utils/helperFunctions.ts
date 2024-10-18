import moment from "moment";

export const isPhoneNumberValid = (phone: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

export const isPanValid = (pan: string): boolean => {
  const regex = /^[A-Z]{3}P[A-Z][0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};

/**
 * Returns the next working day after the given date, excluding weekends and specified dates.
 *
 * @param {string|Date|moment} [currentDate=moment()] - The date from which to start searching. Defaults to today.
 * @param {Array<string>} excludedDates - Array of dates to exclude in 'YYYY-MM-DD' format.
 * @returns {moment} - Moment.js object representing the next working day.
 */
export const getNextWorkingDay = (currentDate = moment(), excludedDates = []) => {
  // Ensure excludedDates are in 'YYYY-MM-DD' format for comparison
  const excluded = excludedDates.map(date => moment(date).format('YYYY-MM-DD'));

  let nextDay = moment(currentDate).add(1, 'days'); // Start checking from the next day

  while (true) {
    const dayOfWeek = nextDay.day(); // 0 (Sunday) to 6 (Saturday)
    const formattedDate = nextDay.format('YYYY-MM-DD');

    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const isExcluded = excluded.includes(formattedDate);

    if (!isWeekend && !isExcluded) {
      return nextDay.format('Do MMMM'); // e.g., "9th September"
    }

    nextDay.add(1, 'days'); // Move to the following day
  }
}

