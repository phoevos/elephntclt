const chalk = require('chalk');
const fs = require('fs');

const sendRequest = require('./utils/sendRequest');
const createURL = require('./utils/createURL');


module.exports = function(object){
    //checkParams is not required

    //Create url
    let baseUrl = createURL('/HealthCheck');
    
    //Send Request
    sendRequest('get', baseUrl);
};