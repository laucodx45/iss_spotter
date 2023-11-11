const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned lat/lng:' , data);
// });

// fetchISSFlyOverTimes({latitude: 70, longitude: 100}, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log("It worked! Returned Fly Over Times: ", data);

// });
const printPassTimes = (passTimes) => {

  for (const element of passTimes) {
    const riseTime = element.risetime;
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(riseTime);
    const duration = element.duration;
    console.log(`Next pass at ${dateTime} for ${duration}`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});