const { error } = require('console');
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api64.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // in the callback fn it takes in (error, ipAddress)
    // therefore we have to put (null, ipAddress) meaning at this point, error should be null
    const ipObj = JSON.parse(body);
    callback(null, ipObj.ip);
    
  });
};

const fetchCoordsByIP = (ipAddress, callback) => {
  request(`http://ipwho.is/${ipAddress}`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
  
    const parseBody = JSON.parse(body);
    // success : false
    if (!parseBody.success) {
      // log Error message
      const message = `Success status was ${parseBody.success}, Server message says ${parseBody.message} when fetched for IP address ${parseBody.ip}`;
      callback(Error(message), null);
      return;
    } else {
      const resultData = {latitude: parseBody.latitude, longitude: parseBody.longitude};
      return callback(null, resultData);
    }
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;

  request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const message = `Status code ${response.statusCode} when fetching ISS pass time: ${body}`;
      callback(Error(message), null);
      return;
    }

    const parseBody = JSON.parse(body);
    // Do you have to return? It seems like it didn't affect the output.
    return callback(null, parseBody.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work: ", error);
      return;
    }
    // If no error use the ip returned by fetchMyIP as argument for fetchCorrdsByIP
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work: ", error);
        return;
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          console.log("It didn't work: ", error);
          return;
        }
        callback(null, data);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};