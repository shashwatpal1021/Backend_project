const moment = require('moment');

// Get today's date
const today = moment();
const lastWeekStartDate = today.clone().subtract(1, 'week').startOf('week');
const lastWeekDates = [];
for (let i = 0; i < 7; i++) {
    const date = lastWeekStartDate.clone().add(i, 'days');
    lastWeekDates.push(`log__${date.format('YYYY-MM-DD')}`);
}
console.log(lastWeekDates);
