const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// }); '70.66.152.215'

fetchCoordsByIP('42', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned lat/lng:' , data);
});