const {nextISSTimesForMyLocation} = require('./iss');

const printPassTimes = (passTimes) => {

  for (const element of passTimes) {
    const riseTime = element.risetime;
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(riseTime);
    const duration = element.duration;
    console.log(`Next pass at ${dateTime} for ${duration}`);
  }
};

module.exports = {printPassTimes};

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   printPassTimes(passTimes);
// });

