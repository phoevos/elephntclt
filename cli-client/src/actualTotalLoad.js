const chalk = require('chalk');
const fs = require('fs');

const sendRequest = require('./utils/sendRequest.js');
const checkParams = require('./utils/checkParams.js');
const createURL = require('./utils/createURL.js');

//Commander passes an object as an argument. We can access parameters with object.param1, object.param2 etc 
module.exports = function(object) {
    let isReady = true;

    //User must provide: area timeres and only one of the following: date, month, year
    if (checkParams('getDataset', object.area, object.timeres, object.date, object.month, object.year)){
        isReady = false;
        console.log(chalk.red('Error! Mandatory parameters for scope ActualTotalLoad not detected'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--area   |-a               ex: Greece'));
        console.log(chalk.green('--timeres|-r               ex: PT15M || PT30M || PT60M'));
        console.log(chalk.green('Choose from:'));
        console.log(chalk.green('--date   |-d               ex: YYYY-MM-DD'));
        console.log(chalk.green('--month  |-m               ex: YYYY-MM'));
        console.log(chalk.green('--year   |-y               ex: YYYY'));
        console.log(chalk.green('Specify:'));
        console.log(chalk.green('--format |-f               ex: json || csv'));
    }
    
    if(isReady){
        //Create url
        let baseUrl;
        if(object.date !== undefined)
            baseUrl = createURL('/ActualTotalLoad/', object.area, object.timeres, 'date/', object.date, object.format)
        else if(object.month !== undefined)
            baseUrl = createURL('/ActualTotalLoad/', object.area, object.timeres, 'month/', object.month, object.format)
        else if(object.year !== undefined) 
            baseUrl = createURL('/ActualTotalLoad/', object.area, object.timeres, 'year/', object.year, object.format)
    
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
        console.log(chalk.red('Terminating ActualTotalLoad without sending GET request'));
};