const checkParams = require('../src/utils/checkParams');
//Checks that user provided all mandatory parameters
//If a parameter is missing (undefined) => returns true

//ActualTotalLoad
describe('ActualTotalLoad with all mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --date 2018-01-04', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', undefined, undefined) ).toBe(false);
    });
});

describe('ActualTotalLoad with all mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --month 2018-01', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, '2018-01', undefined) ).toBe(false);    
    });
});

describe('ActualTotalLoad with all mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, undefined, '2018') ).toBe(false);
    });
});

describe('ActualTotalLoad missing mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad --timeres PT60M --year 2018', () => {
        expect( checkParams('getDataset', undefined, 'PT60M', undefined, undefined, '2018') ).toBe(true);
    });
});

describe('ActualTotalLoad missing mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad --area Greece --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', undefined, undefined, undefined, '2018') ).toBe(true);
    });
});

describe('ActualTotalLoad missing mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, undefined, undefined) ).toBe(true);
    });
});

describe('ActualTotalLoad missing mandatory parameters', () => {
    test('energy_group026 ActualTotalLoad', () => {
        expect( checkParams('getDataset', undefined, undefined, undefined, undefined, undefined) ).toBe(true);
    });
});

describe('ActualTotalLoad wrong date/month/year', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', '2018-01', undefined) ).toBe(true);
    });
});

describe('ActualTotalLoad wrong date/month/year', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --date 2018-01-04 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', undefined, '2018') ).toBe(true);
    });
});

describe('ActualTotalLoad wrong date/month/year', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --month 2018-01 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, '2018-01', '2018') ).toBe(true);
    });
});

describe('ActualTotalLoad wrong date/month/year', () => {
    test('energy_group026 ActualTotalLoad --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', '2018-01', '2018') ).toBe(true);
    });
});

//ActualvsForecast
describe('ActualvsForecast with all mandatory parameters', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --date 2018-01-04', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', undefined, undefined) ).toBe(false);
    });
});

describe('ActualvsForecast with all mandatory parameters', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --month 2018-01', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, '2018-01', undefined) ).toBe(false);    
    });
});

describe('ActualvsForecast with all mandatory parameters', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, undefined, '2018') ).toBe(false);
    });
});

describe('ActualvsForecast missing mandatory parameters', () => {
    test('energy_group026 ActualvsForecast --timeres PT60M --year 2018', () => {
        expect( checkParams('getDataset', undefined, 'PT60M', undefined, undefined, '2018') ).toBe(true);
    });
});

describe('ActualvsForecast missing mandatory parameters', () => {
    test('energy_group026 ActualvsForecast --area Greece --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', undefined, undefined, undefined, '2018') ).toBe(true);
    });
});

describe('ActualvsForecast missing mandatory parameters', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, undefined, undefined) ).toBe(true);
    });
});

describe('ActualvsForecast missing mandatory parameters', () => {
    test('energy_group026 ActualvsForecast', () => {
        expect( checkParams('getDataset', undefined, undefined, undefined, undefined, undefined) ).toBe(true);
    });
});

describe('ActualvsForecast wrong date/month/year', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', '2018-01', undefined) ).toBe(true);
    });
});

describe('ActualvsForecast wrong date/month/year', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --date 2018-01-04 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', undefined, '2018') ).toBe(true);
    });
});

describe('ActualvsForecast wrong date/month/year', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --month 2018-01 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, '2018-01', '2018') ).toBe(true);
    });
});

describe('ActualvsForecast wrong date/month/year', () => {
    test('energy_group026 ActualvsForecast --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', '2018-01', '2018') ).toBe(true);
    });
});

//DayAheadTotalLoadForecast
describe('DayAheadTotalLoadForecast with all mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --date 2018-01-04', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', undefined, undefined) ).toBe(false);
    });
});

describe('DayAheadTotalLoadForecast with all mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --month 2018-01', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, '2018-01', undefined) ).toBe(false);    
    });
});

describe('DayAheadTotalLoadForecast with all mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, undefined, '2018') ).toBe(false);
    });
});

describe('DayAheadTotalLoadForecast missing mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast --timeres PT60M --year 2018', () => {
        expect( checkParams('getDataset', undefined, 'PT60M', undefined, undefined, '2018') ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast missing mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', undefined, undefined, undefined, '2018') ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast missing mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, undefined, undefined) ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast missing mandatory parameters', () => {
    test('energy_group026 DayAheadTotalLoadForecast', () => {
        expect( checkParams('getDataset', undefined, undefined, undefined, undefined, undefined) ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast wrong date/month/year', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', '2018-01', undefined) ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast wrong date/month/year', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --date 2018-01-04 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', undefined, '2018') ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast wrong date/month/year', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --month 2018-01 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', undefined, '2018-01', '2018') ).toBe(true);
    });
});

describe('DayAheadTotalLoadForecast wrong date/month/year', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01 --year 2018', () => {
        expect( checkParams('getDataset', 'Greece', 'PT60M', '2018-01-04', '2018-01', '2018') ).toBe(true);
    });
});

//AggregatedGenerationPerType
describe('AggregatedGenerationPerType with all mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --date 2018-01-04 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', '2018-01-04', undefined, undefined, 'AllTypes') ).toBe(false);
    });
});

describe('AggregatedGenerationPerType with all mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --month 2018-01 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', undefined, '2018-01', undefined, 'AllTypes') ).toBe(false);
    });
});

describe('AggregatedGenerationPerType with all mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --year 2018 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', undefined, undefined, '2018', 'AllTypes') ).toBe(false);
    });
});

describe('AggregatedGenerationPerType missing mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --timeres PT60M --year 2018 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', undefined, 'PT60M', undefined, undefined, '2018', 'AllTypes') ).toBe(true);
    });
});

describe('AggregatedGenerationPerType missing mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --year 2018 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', undefined, undefined, undefined, '2018', 'AllTypes') ).toBe(true);
    });
});

describe('AggregatedGenerationPerType missing mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', undefined, undefined, undefined, undefined, 'AllTypes') ).toBe(true);
    });
});

describe('AggregatedGenerationPerType missing mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --year 2018', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', undefined, undefined, '2018', undefined) ).toBe(true);
    });
});

describe('AggregatedGenerationPerType missing mandatory parameters', () => {
    test('energy_group026 AggregatedGenerationPerType', () => {
        expect( checkParams('getAGPT', undefined, undefined, undefined, undefined, undefined, undefined) ).toBe(true);
    });
});

describe('AggregatedGenerationPerType wrong date/month/year', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', '2018-01-04', '2018-01', undefined, 'AllTypes') ).toBe(true);
    });
});

describe('AggregatedGenerationPerType wrong date/month/year', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --date 2018-01-04 --year 2018 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', '2018-01-04', undefined, '2018', 'AllTypes') ).toBe(true);
    });
});

describe('AggregatedGenerationPerType wrong date/month/year', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --month 2018-01 --year 2018 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', undefined, '2018-01', '2018', 'AllTypes') ).toBe(true);
    });
});

describe('AggregatedGenerationPerType wrong date/month/year', () => {
    test('energy_group026 AggregatedGenerationPerType --area Greece --timeres PT60M --date 2018-01-04 --month 2018-01 --year 2018 --prodtype AllTypes', () => {
        expect( checkParams('getAGPT', 'Greece', 'PT60M', '2018-01-04', '2018-01', '2018', 'AllTypes') ).toBe(true);
    });
});

//Login
describe('Login with all mandatory parameters', () => {
    test('energy_group026 Login --username admin --passw 321nimda', () => {
        expect( checkParams('login', 'admin', '321nimda') ).toBe(false);
    });
});

describe('Login missing mandatory parameters', () => {
    test('energy_group026 Login --passw 321nimda', () => {
        expect( checkParams('login', undefined, '321nimda') ).toBe(true);
    });
});

describe('Login missing mandatory parameters', () => {
    test('energy_group026 Login --username admin', () => {
        expect( checkParams('login', 'admin', undefined) ).toBe(true);
    });
});

describe('Login with all mandatory parameters', () => {
    test('energy_group026 Login', () => {
        expect( checkParams('login', undefined, undefined) ).toBe(true);
    });
});

//NewUser
describe('Admin NewUser with all mandatory parameters', () => {
    test('energy_group026 Admin --newuser someone --passw ***** --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', 'someone', '*****', 'email@gmail.com', 10) ).toBe(false);
    });
});

describe('Admin NewUser missing mandatory parameters', () => {
    test('energy_group026 Admin --passw ***** --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', undefined, '*****', 'email@gmail.com', 10) ).toBe(true);
    });
});

describe('Admin NewUser missing mandatory parameters', () => {
    test('energy_group026 Admin --newuser someone --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', 'someone', undefined, 'email@gmail.com', 10) ).toBe(true);
    });
});

describe('Admin NewUser missing mandatory parameters', () => {
    test('energy_group026 Admin --newuser someone --passw ***** --quota 10', () => {
        expect( checkParams('adminUser', 'someone', '*****', undefined, 10) ).toBe(true);
    });
});

describe('Admin NewUser missing mandatory parameters', () => {
    test('energy_group026 Admin --newuser someone --passw ***** --email email@gmail.com', () => {
        expect( checkParams('adminUser', 'someone', '*****', 'email@gmail.com', undefined) ).toBe(true);
    });
});

describe('Admin NewUser missing mandatory parameters', () => {
    test('energy_group026 Admin --newuser someone --passw ***** --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', undefined, undefined, undefined, undefined, undefined) ).toBe(true);
    });
});

//ModUser
describe('Admin ModUser with all mandatory parameters', () => {
    test('energy_group026 Admin --moduser someone --passw ***** --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', 'someone', '*****', 'email@gmail.com', 10) ).toBe(false);
    });
});

describe('Admin ModUser missing mandatory parameters', () => {
    test('energy_group026 Admin --passw ***** --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', undefined, '*****', 'email@gmail.com', 10) ).toBe(true);
    });
});

describe('Admin ModUser missing mandatory parameters', () => {
    test('energy_group026 Admin --moduser someone --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', 'someone', undefined, 'email@gmail.com', 10) ).toBe(true);
    });
});

describe('Admin ModUser missing mandatory parameters', () => {
    test('energy_group026 Admin --moduser someone --passw ***** --quota 10', () => {
        expect( checkParams('adminUser', 'someone', '*****', undefined, 10) ).toBe(true);
    });
});

describe('Admin ModUser missing mandatory parameters', () => {
    test('energy_group026 Admin --moduser someone --passw ***** --email email@gmail.com', () => {
        expect( checkParams('adminUser', 'someone', '*****', 'email@gmail.com', undefined) ).toBe(true);
    });
});

describe('Admin ModUser with all mandatory parameters', () => {
    test('energy_group026 Admin --moduser someone --passw ***** --email email@gmail.com --quota 10', () => {
        expect( checkParams('adminUser', undefined, undefined, undefined, undefined, undefined) ).toBe(true);
    });
});

//UserStatus
describe('Admin UserStatus with all mandatory parameters', () => {
    test('energy_group026 Admin --userstatus someone', () => {
        expect( checkParams('adminUserStatus', 'someone') ).toBe(false);
    });
});

describe('Admin UserStatus missing mandatory parameters', () => {
    test('energy_group026 Admin', () => {
        expect( checkParams('adminUserStatus', undefined) ).toBe(true);
    });
});

//NewData
describe('Admin NewData with all mandatory parameters', () => {
    test('energy_group026 Admin --newdata ActualTotalLoad --source C:\Users\...', () => {
        expect( checkParams('adminNewData', 'ActualTotalLoad', 'C:\Users\...') ).toBe(false);
    });
});

describe('Admin NewData missing mandatory parameters', () => {
    test('energy_group026 Admin --source C:\Users\...', () => {
        expect( checkParams('adminNewData', undefined, 'C:\Users\...') ).toBe(true);
    });
});

describe('Admin NewData missing mandatory parameters', () => {
    test('energy_group026 Admin --newdata ActualTotalLoad ', () => {
        expect( checkParams('adminNewData', 'ActualTotalLoad', undefined) ).toBe(true);
    });
});

describe('Admin NewData missing mandatory parameters', () => {
    test('energy_group026 Admin', () => {
        expect( checkParams('adminNewData', undefined, undefined) ).toBe(true);
    });
});