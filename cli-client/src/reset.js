const createURL = require('./utils/createURL');
const sendRequest = require('./utils/sendRequest');

module.exports = function(object){
    //checkParams is not required

    //Create url
    let baseUrl = createURL('/Reset');
    
    //Send request
    sendRequest('post', baseUrl);
};