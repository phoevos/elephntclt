const chalk = require('chalk');
const fs = require('fs');

const sendRequest = require('./utils/sendRequest');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');


module.exports = function(object){    
    let isReady = true;
    
    //Check parameters
    if ( checkParams('adminUser', object.newuser, object.passw, object.email, object.quota) ){
        isReady = false;
        console.log(chalk.red('Error! Mandatory parameters for creating user not detected'));
        console.log(chalk.red('Please provide:'));
        console.log(chalk.red('Username (--newuser)'));
        console.log(chalk.red('Password (--passw)'));
        console.log(chalk.red('Email (--email)'));        
        console.log(chalk.red('Quota (--quota)'));        
    }

    if(isReady){
        //Create url
        let baseUrl = createURL('/Admin/users/', object.newuser);
        
        //Create Body
        const requestBody = {
                username: object.newuser,
                password: object.passw,
                email: object.email,
                quota: object.quota
            };
        
        //Read token from file and send request
        fs.readFile('../softeng19bAPI.token', 'utf8', (err1, data) => {
            if (err1){
                sendRequest('post', baseUrl, undefined, requestBody);
                return;
            }
            sendRequest('post', baseUrl, data, requestBody);
            return;
        });
    }
    else
        console.log(chalk.red('User NOT created'));
};