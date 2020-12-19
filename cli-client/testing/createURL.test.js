const createURL = require('../src/utils/createURL');
//Creates URL for sending REST API requests

//ActualTotalLoad
describe('ActualTotalLoad URL ', () => {
    test('energy_group026 ActualTotalLoad --area Austria --timeres PT60M --date 2018-01-04', () => {
        expect( createURL('/ActualTotalLoad/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'json') )
        .toBe('http://localhost:8765/energy/api/ActualTotalLoad/Austria/PT60M/date/2018-01-04?format=json');
    });
});

describe('ActualTotalLoad URL ', () => {
    test('energy_group026 ActualTotalLoad --area Austria --timeres PT60M --date 2018-01-04 --fromat csv', () => {
        expect( createURL('/ActualTotalLoad/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'csv') )
        .toBe('http://localhost:8765/energy/api/ActualTotalLoad/Austria/PT60M/date/2018-01-04?format=csv');
    });
});

//ActualvsForecast
describe('ActualvsForecast URL ', () => {
    test('energy_group026 ActualvsForecast --area Austria --timeres PT60M --date 2018-01-04', () => {
        expect( createURL('/ActualvsForecast/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'json') )
        .toBe('http://localhost:8765/energy/api/ActualvsForecast/Austria/PT60M/date/2018-01-04?format=json');
    });
});

describe('ActualvsForecast URL ', () => {
    test('energy_group026 ActualvsForecast --area Austria --timeres PT60M --date 2018-01-04 --fromat csv', () => {
        expect( createURL('/ActualvsForecast/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'csv') )
        .toBe('http://localhost:8765/energy/api/ActualvsForecast/Austria/PT60M/date/2018-01-04?format=csv');
    });
});

//DayAheadTotalLoadForecast
describe('DayAheadTotalLoadForecast URL ', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Austria --timeres PT60M --date 2018-01-04', () => {
        expect( createURL('/DayAheadTotalLoadForecast/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'json') )
        .toBe('http://localhost:8765/energy/api/DayAheadTotalLoadForecast/Austria/PT60M/date/2018-01-04?format=json');
    });
});

describe('DayAheadTotalLoadForecast URL ', () => {
    test('energy_group026 DayAheadTotalLoadForecast --area Austria --timeres PT60M --date 2018-01-04 --fromat csv', () => {
        expect( createURL('/DayAheadTotalLoadForecast/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'csv') )
        .toEqual('http://localhost:8765/energy/api/DayAheadTotalLoadForecast/Austria/PT60M/date/2018-01-04?format=csv');
    });
});

//AggregatedGenerationPerType
describe('AggregatedGenerationPerType URL ', () => {
    test('energy_group026 AggregatedGenerationPerType --area Austria --timeres PT60M --date 2018-01-04 --prodtype AllTypes --fromat csv', () => {
        expect( createURL('/AggregatedGenerationPerType/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'csv', 'AllTypes') )
        .toEqual('http://localhost:8765/energy/api/AggregatedGenerationPerType/Austria/AllTypes/PT60M/date/2018-01-04?format=csv');
    });
});

describe('AgggregatedGenerationPerType URL ', () => {
    test('energy_group026 AgggregatedGenerationPerType --area Austria --timeres PT60M --date 2018-01-04 --prodtype Geothermal --fromat csv', () => {
        expect( createURL('/AggregatedGenerationPerType/', 'Austria', 'PT60M', 'date/', '2018-01-04', 'csv', 'Geothermal') )
        .toEqual('http://localhost:8765/energy/api/AggregatedGenerationPerType/Austria/Geothermal/PT60M/date/2018-01-04?format=csv');
    });
});

//HealthCheck
describe('HealthCheck URL ', () => {
    test('energy_group026 HealthCheck', () => {
        expect( createURL('/HealthCheck') )
        .toEqual('http://localhost:8765/energy/api/HealthCheck');
    });
});

//Login
describe('Login URL ', () => {
    test('energy_group026 HealthCheck', () => {
        expect( createURL('/Login') )
        .toEqual('http://localhost:8765/energy/api/Login');
    });
});

//Logout
describe('Logout URL ', () => {
    test('energy_group026 Logout', () => {
        expect( createURL('/Logout') )
        .toEqual('http://localhost:8765/energy/api/Logout');
    });
});

//Reset
describe('Reset URL ', () => {
    test('energy_group026 Reset', () => {
        expect( createURL('/Reset') )
        .toEqual('http://localhost:8765/energy/api/Reset');
    });
});

//NewUser
describe('NewUser URL ', () => {
    test('energy_group026 --newuser someone --passw ***** --email email@google.com --quota 10', () => {
        expect( createURL('/Admin/users/', 'someone') )
        .toEqual('http://localhost:8765/energy/api/Admin/users/someone');
    });
});

//ModUser
describe('ModUser URL ', () => {
    test('energy_group026 --modeuser someone --passw ***** --email email@google.com --quota 10', () => {
        expect( createURL('/Admin/users/', 'someone') )
        .toEqual('http://localhost:8765/energy/api/Admin/users/someone');
    });
});

//UserStatus
describe('UserStatus URL ', () => {
    test('energy_group026 --userstatus soneone', () => {
        expect( createURL('/Admin/users/', 'someone') )
        .toEqual('http://localhost:8765/energy/api/Admin/users/someone');
    });
});

//NewData
describe('NewData URL ', () => {
    test('energy_group026 --newdata ActualTotalLoad --source C:\Users\...', () => {
        expect( createURL('/Admin/', 'ActualTotalLoad') )
        .toEqual('http://localhost:8765/energy/api/Admin/ActualTotalLoad');
    });
});
//newData createURL('/Admin/', object.newData);