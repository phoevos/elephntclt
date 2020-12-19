#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

//Functions
const actualTotalLoad = require('./src/actualTotalLoad');
const aggregatedGenerationPerType = require('./src/aggregatedGenerationPerType');
const dayAheadTotalLoadForecast = require('./src/dayAheadTotalLoadForecast');
const actualvsForecast = require('./src/actualvsForecast');
const healthCheck = require('./src/healthCheck');
const reset = require('./src/reset'); 
const newUser = require('./src/newUser');
const modUser = require('./src/modUser');
const userStatus = require('./src/userStatus');
const newData = require('./src/newData');
const logIn = require('./src/logIn');
const logOut = require('./src/logOut');



//Version option
program
    .version('1.0.0')
    .description('Command Line Interface Software Engineering NTUA 2019');
//End version

//ActualTotalLoad
program
    .command('ActualTotalLoad')
    .alias('atl')
    .description('Actual Total Load')
    .option('-a, --area [area]', 'Area name')
    .option('-r, --timeres [timeres]', 'Resolution code')
    .option('-d, --date [date]', 'YYYY-MM-DD')
    .option('-m, --month [month]', 'YYYY-MM')
    .option('-y, --year [year]', 'YYYY')
    .option('-f, --format [format]', 'Content-type', 'json')
    .action(function(cmdObj) {
        actualTotalLoad(cmdObj);
    });
//End ActualTotalLoad

//AggregatedGenerationPerType
program
    .command('AggregatedGenerationPerType')
    .alias('agpt')
    .description('Aggregated Generation Per Type')
    .option('-a, --area [area]', 'Area name')
    .option('-r, --timeres [timeres]', 'Resolution code')
    .option('-p, --prodtype [prodtype]', 'Production type', )
    .option('-d, --date [date]', 'YYYY-MM-DD')
    .option('-m, --month [month]', 'YYYY-MM')
    .option('-y, --year [year]', 'YYYY')
    .option('-f, --format [format]', 'Content-type', 'json')
    .action(function(cmdObj) {
        aggregatedGenerationPerType(cmdObj);
    });
//End AggregatedGenerationPerType

//DayAheadTotalLoadForecast
program
    .command('DayAheadTotalLoadForecast')
    .alias('datlf')
    .description('Day Ahead Total LoadForecast')
    .option('-a, --area [area]', 'Area name')
    .option('-r, --timeres [timeres]', 'Resolution code')
    .option('-d, --date [date]', 'YYYY-MM-DD')
    .option('-m, --month [month]', 'YYYY-MM')
    .option('-y, --year [year]', 'YYYY')
    .option('-f, --format [format]', 'Content-type', 'json')
    .action(function(cmdObj) {
        dayAheadTotalLoadForecast(cmdObj);
    });
//End DayAheadTotalLoadForecast

//ActualvsForecast
program
    .command('ActualvsForecast')
    .alias('avsf')
    .description('Actual vs Forecast')
    .option('-a, --area [area]', 'Area name')
    .option('-r, --timeres [timeres]', 'Resolution code')
    .option('-d, --date [date]', 'YYYY-MM-DD')
    .option('-m, --month [month]', 'YYYY-MM')
    .option('-y, --year [year]', 'YYYY')
    .option('-f, --format [format]', 'Content-type', 'json')
    .action(function(cmdObj) {
        actualvsForecast(cmdObj);
    });
//End ActualvsForecast

//HealthCheck
program
    .command('HealthCheck')
    .alias('hc')
    .description('Confirms end-to-end connectivity')
    .action(function(cmdObj){
        healthCheck(cmdObj);
    });
//End HealthCheck

//Reset
program
    .command('Reset')
    .alias('r')
    .description('Resets Database')
    .action(function(cmdObj){
        reset(cmdObj);
    });
//End Reset

//Admin
program
    .command('Admin')
    .alias('ad')
    .description('Admin management operations')
    .option('-n, --newuser [username]', 'Create a new user')
    .option('-m, --moduser [username]', 'Modify user')
    .option('-u, --userstatus [username]', 'Show user status')
    .option('-d, --newdata [scope]', 'Add new documents')
    .option('-p, --passw [passw]')
    .option('-e, --email [email]')
    .option('-q, --quota [quota]')
    .option('-s, --source [source]')
    .action( function(cmdObj) {
        if(    cmdObj.newuser !== undefined
           &&  (cmdObj.moduser === undefined && cmdObj.userstatus === undefined && cmdObj.newdata === undefined)
          )
            newUser(cmdObj);
        else if(    cmdObj.moduser !== undefined
           &&  (cmdObj.newuser === undefined && cmdObj.userstatus === undefined && cmdObj.newdata === undefined)
          )
            modUser(cmdObj);
        else if(    cmdObj.userstatus !== undefined
           &&  (cmdObj.newuser === undefined && cmdObj.moduser === undefined && cmdObj.newdata === undefined)
          )
            userStatus(cmdObj);
        else if(    cmdObj.newdata !== undefined
           &&  (cmdObj.newuser === undefined && cmdObj.moduser === undefined && cmdObj.userstatus === undefined)
          )
            newData(cmdObj);
        else{
            console.log(chalk.red('Error! Mandatory parameters for scope Admin not detected'));
            console.log(chalk.green('Please choose one of the following subcommands'));
            console.log(chalk.green('--newuser    |-n [username]              Create a new user'));
            console.log(chalk.green('--moduser    |-m [username]              Modify user'));
            console.log(chalk.green('--userstatus |-u [username]              Show user status'));
            console.log(chalk.green('--newdata    |-d [Database-Collection]   Add new documents'));
        }
    });
//end Admin

//Login
program
    .command('Login')
    .alias('li')
    .description('User Log In')
    .option('-u, --username [username]', 'User name')
    .option('-p, --passw [passw]', 'Password')
    .action(function(cmdObj){
        logIn(cmdObj);
    });
//End Login

//Logout
program
    .command('Logout')
    .alias('lo')
    .description('User Log Out')
    .action(function(cmdObj){
        logOut(cmdObj);
    });
//End Logout

program.parse(process.argv);

if(    process.argv.length < 3 ){
    console.log(chalk.red('Error! Mandatory parameters not detected'));
    console.log(chalk.green('Choose a scope from:'));
    console.log(chalk.green('ActualTotalLoad             |atl'));
    console.log(chalk.green('AggregatedGenerationPerType |agpt'));
    console.log(chalk.green('DayAheadTotalLoadForecast   |datlf'));
    console.log(chalk.green('ActualvsForecast            |avsf'));
    console.log(chalk.green('HealthCheck                 |hc'));
    console.log(chalk.green('Reset                       |r'));
    console.log(chalk.green('Admin                       |ad'));
    console.log(chalk.green('Login                       |li'));
    console.log(chalk.green('Logout                      |lo'));
    console.log(chalk.green('For more info, type "scope" --help'));
}
else if (    process.argv[2] !== 'ActualTotalLoad'
         &&  process.argv[2] !== 'atl'
         &&  process.argv[2] !== 'AggregatedGenerationPerType'
         &&  process.argv[2] !== 'agpt'
         &&  process.argv[2] !== 'DayAheadTotalLoadForecast'
         &&  process.argv[2] !== 'datlf'
         &&  process.argv[2] !== 'ActualvsForecast'
         &&  process.argv[2] !== 'avsf'
         &&  process.argv[2] !== 'Admin'
         &&  process.argv[2] !== 'ad'
         &&  process.argv[2] !== 'HealthCheck'
         &&  process.argv[2] !== 'hc'
         &&  process.argv[2] !== 'Reset'
         &&  process.argv[2] !== 'r'
         &&  process.argv[2] !== 'Login'
         &&  process.argv[2] !== 'li'
         &&  process.argv[2] !== 'Logout'
         &&  process.argv[2] !== 'lo'
){
    console.log(chalk.red('Error! Command not supported'));
    console.log(chalk.green('For more info, type --help'));
}