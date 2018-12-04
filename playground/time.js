//Jan 1st 1970 00:00:00 am

//1000 is 1000 milliseconds

var moment = require('moment');

// date = new Date();
// console.log(date.getMonth());

var date = moment();
date.add(1,'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY'));


var date2 = moment();
console.log(date2.format('h:mm a'));
