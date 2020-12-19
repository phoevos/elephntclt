const chalk = require('chalk');
const fs = require('fs');

const sendRequest = require('./utils/sendRequest');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){
    let isReady = true;
    
    //Check parameters

    if( checkParams('adminUserStatus', object.userstatus) ){
        isReady = false;
        console.log(chalk.red('Please provide username'));       
    }

    if(isReady){
        //Create url
        let baseUrl = createURL('/Admin/users/', object.userstatus);
        
        //Read token from file and send request
        fs.readFile('../softeng19bAPI.token', 'utf8', (err1, data) => {
            if (err1){
                sendRequest('get', baseUrl);
                return;
            }
            sendRequest('get', baseUrl, data);
            return;
        });
    }
    else
        console.log(chalk.red('User NOT created'));
};