const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

const createURL = require('./utils/createURL');


module.exports = function(object){
    //checkParams is not required

    //Check if user is already logged in with Async file exists
    fs.access('../softeng19bAPI.token', fs.F_OK, (err1) => {
        //File does not exist - User canNOT log out
        if (err1) {
            if (err1.code === 'ENOENT') { 
                console.log(chalk.red('Error! No user currently logged in'));
                return;
            }
            //Another error has occured
            else
                throw err1;
        }

        //File exists - User can log out
        else{
            //Create url
            let baseUrl = createURL('/Logout');
            
            //Read token from file
            fs.readFile('../softeng19bAPI.token', 'utf8', (err2, data) => {
                if (err2)
                    throw err2;
            
                //Create token header
                const config = {
                    headers: {
                      'X-OBSERVATORY-AUTH': data
                    }
                }

                //Send empty post request
                axios.post(baseUrl, {}, config)
                .then(res => {
                    //Erase file
                    fs.unlink('../softeng19bAPI.token', (err4) => {
                        if (err4)
                            throw err4;
                        console.log(chalk.green('User successfully logged out'));
                    })
                })
                .catch(err3 => {
                    console.log(err3.response.data);
                    console.log(err3.message);
                })
            });
            return;
        }
    });
};