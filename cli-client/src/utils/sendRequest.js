const axios = require('axios');
const chalk = require('chalk');

module.exports = function(type, url, header, body) {
    switch(type) {
        case 'get':
            if (header === undefined){
                axios.get(url)
                .then(res => console.log(res.data))
                .catch( err =>{
                    console.log(chalk.red(err.message));
                    console.log(chalk.red(err.response.data));
                });
                break;
            }
            else{
                const config = {
                    headers: {
                      'X-OBSERVATORY-AUTH': header
                    }
                }
        
                axios.get(url, config)
                    .then(res => console.log(res.data))
                    .catch( err =>{
                        console.log(chalk.red(err.message));
                        console.log(chalk.red(err.response.data));
                    });
                break;
            }
        case 'post':
            if(header === undefined){
                axios.post(url)
                .then(res => console.log(res.data))
                .catch(err => {
                    console.log(chalk.red(err.message));
                    console.log(chalk.red(err.response.data));
                });
                break;
            }
            else{
                let config;
                if(body.source === undefined){
                    config = {
                        headers: {
                          'X-OBSERVATORY-AUTH': header
                        }
                    }
                }
                else{    
                    config = {
                        headers: {
                          'X-OBSERVATORY-AUTH': header,
                          'Content-Type': `multipart/form-data; boundary=${body._boundary}`
                        },
                        maxContentLength: 100000000,
                        maxBodyLength: 1000000000
                    }
                }

                axios.post(url, body, config)
                .then(res => console.log(res.data))
                .catch(err => {
                    console.log(chalk.red(err.message));
                    console.log(chalk.red(err.response.data));
                });
                break;
            }
        case 'put':
            if(header === undefined){
                axios.put(url)
                .then(res => console.log(res.data))
                .catch(err => {
                    console.log(chalk.red(err.message));
                    console.log(chalk.red(err.response.data));
                });
                break;
            }
            else{
                const config = {
                    headers: {
                      'X-OBSERVATORY-AUTH': header
                    }
                }    
                axios.put(url, body, config)
                .then(res => console.log(res.data))
                .catch(err => {
                    console.log(chalk.red(err.message));
                    console.log(chalk.red(err.response.data));
                });
                break;
            }
        default:
          console.log(chalk.red('Wrong type parameter'));
    }
}