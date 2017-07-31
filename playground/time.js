const moment = require('moment');

// Create new moment object,
// representing the current moment in time
const createdAt = 1234;
const date = moment(createdAt);


const someTimestamp = moment().valueOf();
// Formats takes in a pattern:
// MMM - gets the shorthand version of the month
// YYYY - gets the full year, like 2016

console.log(date.format('h:mm a'));
