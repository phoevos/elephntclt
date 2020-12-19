const chalk = require('chalk');

//Checks parameters
//if (parameters are wrong) return true
module.exports = function(type, param1, param2, param3, param4, param5, param6){
	
	//Check is user used parameters as true flag (ex energy_group026 Login --username --passw 12345)
	if (param1 === true || param2 === true || param3 === true || param4 === true || param5 === true || param6 === true)
		return true;
	
	//Make user give production type as: "Fosil Gas"
	if( process.argv.length >= 14 ){
		console.log(chalk.red('in AggregatedGenerationPerType please provide --productiontype as as a string'));
		console.log(chalk.red('Example: [...] --prodtype "Fosil Gas"'));
		return true;
	}

	switch(type){
		case 'getDataset':
			//ActualTotalLoad, ActualvsForecast, DayAheadTotalLoad
			if(    param1 === undefined
	        	|| param2 === undefined
	        	|| (param3 === undefined && param4 === undefined && param5 === undefined)
	        	|| (param3 !== undefined && (param4 !== undefined || param5 !== undefined))
	        	|| (param4 !== undefined && (param3 !== undefined || param5 !== undefined))
	        	|| (param5 !== undefined && (param3 !== undefined || param4 !== undefined))
	    	)
				return true;  //wrong parameters
			else
				return false;
		case 'getAGPT':
				//AggregatedGenerationPerType
				if(    param1 === undefined
					|| param2 === undefined
					|| param6  === undefined
					|| (param3 === undefined && param4 === undefined && param5 === undefined)
					|| (param3 !== undefined && (param4 !== undefined || param5 !== undefined))
					|| (param4 !== undefined && (param3 !== undefined || param5 !== undefined))
					|| (param5 !== undefined && (param3 !== undefined || param4 !== undefined))
				)
					return true;  //wrong parameters
				else
					return false;	
		case 'login': 	//Login
			if( param1 === undefined || param2 === undefined)
				return true;	//wrong parameters
			else
				return false;
		case 'adminUser': 	//Admin newuser, Admin moduser
			if(    param1 === undefined
	        	|| param2 === undefined
	        	|| param3  === undefined
	        	|| param4  === undefined
	        )
					return true;  //wrong parameters
				else
					return false;
		case 'adminUserStatus': 	//Admin userstatus
			if (param1 === undefined)
				return true;	//wrong parameters
			else
				return false;
		case 'adminNewData': 	//Admin newdata
			if (param1 === undefined || param2 === undefined)
				return true;	//wrong parameters
			else
				return false;		
		default: //HealthCheck, Reset, Logout Do not need check parameters
			return false;
	}

}