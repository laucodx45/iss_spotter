const { error } = require('console');
const request = require('request');

const urlForIP = 'https://api64.ipify.org/?format=json';

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(urlForIP, (error, response, body) => {
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
    const ipAddress = JSON.parse(body);
    callback(null, ipAddress);
    
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
    }
    
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};