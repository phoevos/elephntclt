const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const qs = require('querystring')

const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){
    let isReady = true;
    
    //Check for parameters
    if( checkParams('login', object.username, object.passw) ){
        isReady = false;
        console.log(chalk.red('Error! Username and password required'));
        console.log(chalk.green('Mandatory Parameters:'));
        console.log(chalk.green('--username   |-u               ex: user2112'));
        console.log(chalk.green('--passw      |-p               ex: ********'));
    }

    if(isReady){
        //Check if user is already logged in with Async file exists
        fs.access('../softeng19bAPI.token', fs.F_OK, (err1) => {
            //File does not exist - New user can log in
            if (err1) {
                if(err1.code === 'ENOENT'){
                    //Create url
                    let baseUrl = createURL('/Login');
                    
                    //application/x-www-form-urlencoded
                    const config = {
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }

                    //Create Request Body
                    const requestBody = {
                        username: object.username,
                        password: object.passw
                    };
                    
                    //Send post request
                    axios.post(baseUrl, qs.stringify(requestBody), config )
                    .then(res => {
                        //Write in file
                        fs.writeFile('../softeng19bAPI.token', res.data.token, err3 =>{
                            //Error while writing in file
                            if (err3)
                                throw err3;
                            console.log(chalk.green('User successfully logged in'));
                            //console.log(res.data.token);
                        });
                    })
                    .catch(err2 => {
                        console.log(chalk.red(err2.message));
                        console.log(chalk.red(err2.response.data));
                    })
                    return;
                }
                //Another error has occured
                else
                    throw err1
            }
            //File already exists - New user canNOT log in
            else{
                console.log(chalk.red('Error! User already logged in'));
                return;
            }
        });
    }

};