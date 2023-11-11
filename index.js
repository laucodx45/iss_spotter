const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// let ip = '70.66.152.215';
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