const chalk = require('chalk');
const fs = require('fs');
const qs = require('querystring');
const FormData = require('form-data');
const request = require('request');

const sendRequest = require('./utils/sendRequest');
const checkParams = require('./utils/checkParams');
const createURL = require('./utils/createURL');

module.exports = function(object){
    let isReady = true;
    if( checkParams('adminNewData', object.newdata, object.source) ){
        isReady = false;
        console.log(chalk.red('Error! Mandatory parameters for adding data not detected'));
        console.log(chalk.red('Please provide:'));
        console.log(chalk.red('Scope (--newdata) ex: ActualTotalLoad, AggregatedGenerationPerType, DayAheadTotalLoadForecast'));
        console.log(chalk.red('Source (--source) ex: CSV file destinations'));
    }

    if(isReady){
    	//Create url
        let baseUrl = createURL('/Admin/', object.newdata);
        
        //Create Body
        //Read token from file and send request
        fs.readFile('../softeng19bAPI.token', 'utf8', (err1, data) => {
            if (err1){
                //console.log('send1');       //REMOVE
                //sendRequest('post', baseUrl, undefined, requestBody);
                const options = {
                    method: "POST",
                    url: baseUrl,
                    port: 8765,
                    headers: {
                        "X-OBSERVATORY-AUTH": data,
                        "Content-Type": "multipart/form-data"
                    },
                    formData : {
                        "file" : fs.createReadStream(object.source)
                    }
                };
                
                request(options, function (err, res, body) {
                    if(err) console.log(err);
                    console.log(body);
                });
                return;
            }
            //console.log('send2');           //REMOVE
            //sendRequest('post', baseUrl, data, requestBody);
            const options = {
                method: "POST",
                url: baseUrl,
                port: 8765,
                headers: {
                    "X-OBSERVATORY-AUTH": data,
                    "Content-Type": "multipart/form-data"
                },
                formData : {
                    "file" : fs.createReadStream(object.source)
                }
            };
            
            request(options, function (err, res, body) {
                if(err) console.log(err);
                console.log(body);
            });
            return;
        });
        return;    
    }
    else
    	console.log(chalk.red('Data NOT created'));
};


// module.exports = function(object){
//     //console.log(chalk.magenta('Inside newData function'));      //REMOVE
//     let isReady = true;
//     // if(     object.newdata === undefined
//     //     ||  object.source === undefined
//     //     ||  (object.newdata !== 'ActualTotalLoad' && object.newdata !== 'AggregatedGenerationPerType' && object.newdata !== 'DayAheadTotalLoadForecast' )
//     // ){
//     if( checkParams('adminNewData', object.newdata, object.source) ){
//         isReady = false;
//         console.log(chalk.red('Error! Mandatory parameters for adding data not detected'));
//         console.log(chalk.red('Please provide:'));
//         console.log(chalk.red('Scope (--newdata) ex: ActualTotalLoad, AggregatedGenerationPerType, DayAheadTotalLoadForecast'));
//         console.log(chalk.red('Source (--source) ex: CSV file destinations'));
//     }

//     if(isReady){
//     	//Create url
//         // let baseUrl = 'http://localhost:8765/energy/api/Admin/';   
//         // baseUrl = baseUrl + object.newdata;
//         let baseUrl = createURL('/Admin/', object.newdata);
//         //console.log('Sending POST request to:');    //REMOVE
//         //console.log(baseUrl);       //REMOVE

//         //console.log(`To add data of ${object.source}`)  //REMOVE
        
//         //Create Body
//         // let form_data = new FormData();
//         // form_data.append("file", fs.createReadStream(`${object.source}`))
//         // console.log(form_data);
//         // let requestBody = {
//         //     data: form_data
//         // }
//         // //requestBody = qs.stringify(requestBody);
//         // console.log(requestBody);

//         let requestBody;
//         fs.readFile(object.source, 'utf8', (err2, ndata) => {
//             if(err2){
//                 console.log(err2);
//                 //console.log('no read from file');   //REMOVE
//                 return;
//             }
//             var form_data = new FormData();
//             form_data.append("file", ndata);
//             form_data.append("source", object.source);            
//             requestBody = {
//                 data: form_data
//             };

//             //Read token from file and send request
//             fs.readFile('../softeng19bAPI.token', 'utf8', (err1, data) => {
//                 if (err1){
//                     //console.log('send1');       //REMOVE
//                     sendRequest('post', baseUrl, undefined, requestBody);
//                     return;
//                 }
//                 //console.log('send2');           //REMOVE
//                 sendRequest('post', baseUrl, data, requestBody);
//                 return;
//             });
//             return;
//         })


//         // const requestBody = {
//         //         source: object.source
//         //     };

//         //Send request
//         // axios.post(baseUrl, {
//         // 	source: object.source
//         // })
//         // .then(res => console.log(res.data))
//         // .catch(err => console.log(err.message))

//         // multipart/form-data
//         // const config = {
//         //     headers: {
//         //       'Content-Type': 'multipart/form-data'
//         //     }
//         // };

//         // axios.post(baseUrl, {
//         // 	source: object.source
//         // }, config)
//         // .then(res => console.log(res))
//         // .catch(err => console.log(err.message))

//         //multipart/form-data 2
//         // axios.post( baseUrl,{
//         //     source: object.source
//         // },{ 
//         //     headers : {'Content-Type': 'multipart/form-data'}
//         // })
//         // .then(res => console.log(res.data))
//         // .catch(err => console.log(err.message))
        
//     }
//     else
//     	console.log(chalk.red('Data NOT created'));
// };