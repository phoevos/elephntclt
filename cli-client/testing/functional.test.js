const { exec } = require("child_process");

let payload1 = 
[
    {
      Source: 'entso-e',
      Dataset: 'ActualTotalLoad',
      AreaName: 'Greece',
      AreaTypeCode: 'CTY',
      MapCode: 'GR',
      ResolutionCode: 'PT60M',
      Year: 2018,
      Month: 1,
      ActualTotalLoadByMonthValue: 1308759.3499999999
    }
]


describe('Functional tests', () => {
    test('T01. Health check status is OK.', () => {
        exec("energy_group026 HealthCheck", (error, stdout, stderr) => {
            //expect(stdout).toBe("{ status: 'OK' }\n");
            expect(stdout).toBe(testPayload);
        });
    });

    // test('T02. The database is reset successfully.', () => {
    //     exec("energy_group026 Reset", (error, stdout, stderr) => {
    //         expect(stdout).toBe("{ status: 'OK' }\n");
    //     });
    // });

    test('T03. Admin logs in successfully.', () => {
        exec("energy_group026 Login --username admin --passw 321nimda", (error, stdout, stderr) => {
            expect(stdout).toBe('User successfully logged in\n');
        });
    });

    test('T04. Admin creates a new user.', () => {
        exec("energy_group026 Admin --newuser user --passw 4321resu --email user@ntua.gr --quota 100", (error, stdout, stderr) => {
            expect(stdout).toBe("{ username: 'user', email: 'user@ntua.gr', quota: 100 }\n");
        });
    });
    
    test('T05. Admin limits quota of user.', () => {
        exec("energy_group026 Admin --moduser user --passw 4321resu --email user@ntua.gr --quota 1", (error, stdout, stderr) => {
            expect(stdout).toBe("{ username: 'user', email: 'user@ntua.gr', quota: 1 }\n");
        });
    });

    test('T06. Admin logs out.', () => {
        exec("energy_group026 Logout", (error, stdout, stderr) => {
            expect(stdout).toBe('User successfully logged out\n');
        });
    });

    test('T07. User logs in successfully.', () => {
        exec("energy_group026 Login --username user --passw 4321resu", (error, stdout, stderr) => {
            expect(stdout).toBe('User successfully logged in\n');
        });
    });

    test('T08. User retrieves ATL.', () => {
        exec("energy_group026 ActualTotalLoad --area Greece --timeres PT60M --year 2018", (error, stdout, stderr) => {
            expect(stdout).toBe(payload1);
        });
    });

    test('T09. User retrieves ATL with no quota.', () => {
        exec("energy_group026 ActualTotalLoad --area Greece --timeres PT60M --year 2018", (error, stdout, stderr) => {
            expect(stdout).toBe('Request failed with status code 402\nNo quota.\n');
        });
    });

    test('T10. User logs out.', () => {
        exec("energy_group026 Logout", (error, stdout, stderr) => {
            expect(stdout).toBe('User successfully logged out\n');
        });
    });

    test('T11. Anonymous cannot retrieve ATL.', () => {
        exec("energy_group026 ActualTotalLoad --area Greece --timeres PT60M --year 2018", (error, stdout, stderr) => {
            expect(stdout).toBe('Request failed with status code 401\nAccess denied. No token provided.\n');
        });
    });

});