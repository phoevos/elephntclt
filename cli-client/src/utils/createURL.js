const chalk = require('chalk');

module.exports = function(type, param1, param2, param3, param4, format, prodtype){
	let base = 'http://localhost:8765/energy/api';
	base = base + type;

	if(type === '/ActualTotalLoad/' || type === '/ActualvsForecast/' || type === '/DayAheadTotalLoadForecast/' || type === '/AggregatedGenerationPerType/'){
		if(type === '/AggregatedGenerationPerType/')
			param1 = param1 + '/' + prodtype;
		base = base + param1 + '/' + param2 + '/' + param3 + param4 + '?format=' + format;
	}
	else if(type === '/Admin/users/' || type === '/Admin/'){
		if(param1 !== undefined)
			base = base + param1;
	}
	return base;
}