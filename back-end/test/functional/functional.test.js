const {User} = require('../../models/user')
const {ActualTotalLoad} = require('../../models/actualTotalLoad')
const mongoose = require('mongoose')
const config = require('config')
const request = require('supertest')
const app = require('../../app')

// actual jwt's for admin and user.
let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJpbmRsb3Z1QHdlbmEuZ3IiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1ODMwODU0ODJ9.YRcmQ6-Bn_en_L-FNFzcKn2NJSZtw6oqY1G2CVRK9KY"
let token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAbnR1YS5nciIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1ODMwODU2MTh9.fnhNW9Mcmw_OUJyElJU4cPW8oAu07zKpnSUr2etXcAI"

const atl1 = {
    EntityCreatedAt: "2020-03-01 12:27:36.7610129 +00:00",
    EntityModifiedAt: "2020-03-01 12:27:36.7610129 +00:00",
    ActionTaskID: "1312",
    Status: "wena",
    Year: 2000,
    Month: 1,
    Day: 1,
    DateTime: "2020-03-01 12:27:36.7610129 +00:00",
    AreaName: "Greece",
    UpdateTime: "2020-03-01 12:27:36.7610129 +00:00",
    TotalLoadValue: 0.0,
    AreaTypeCodeId: mongoose.Types.ObjectId('000000000000000000000002'),
    AreaCodeId: mongoose.Types.ObjectId('000000000000000000000001'),
    ResolutionCodeId: mongoose.Types.ObjectId('000000000000000000000002'),
    MapCodeId: mongoose.Types.ObjectId('000000000000000000000002'),
    RowHash: "indlovu"
}
const atl2 = {
    EntityCreatedAt: "2020-03-01 12:27:36.7610129 +00:00",
    EntityModifiedAt: "2020-03-01 12:27:36.7610129 +00:00",
    ActionTaskID: "1312",
    Status: "wena",
    Year: 2000,
    Month: 1,
    Day: 2,
    DateTime: "2020-03-01 12:27:36.7610129 +00:00",
    AreaName: "Greece",
    UpdateTime: "2020-03-01 12:27:36.7610129 +00:00",
    TotalLoadValue: 0.0,
    AreaTypeCodeId: mongoose.Types.ObjectId('000000000000000000000002'),
    AreaCodeId: mongoose.Types.ObjectId('000000000000000000000001'),
    ResolutionCodeId: mongoose.Types.ObjectId('000000000000000000000002'),
    MapCodeId: mongoose.Types.ObjectId('000000000000000000000002'),
    RowHash: "indlovu"
}
const payload1 = [
    {
    "Source": "entso-e",
    "Dataset": "ActualTotalLoad",
    "AreaName": "Greece",
    "AreaTypeCode": "GR",
    "MapCode": "Foo",
    "ResolutionCode": "PT60M",
    "Year": 2000,
    "Month": 1,
    "Day": 1,
    "ActualTotalLoadValue": 0.0
    }
]
const payload2 = [
    {
    "Source": "entso-e",
    "Dataset": "ActualTotalLoad",
    "AreaName": "Greece",
    "AreaTypeCode": "GR",
    "MapCode": "Foo",
    "ResolutionCode": "PT60M",
    "Year": 2000,
    "Month": 1,
    "Day": 2,
    "ActualTotalLoadValue": 0.0
    }
]
beforeAll(async() => {
    const db = config.get('db')

    // Connecting to the database
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(async() => {
        let atlp1 = new ActualTotalLoad(atl1)
        atlp1 = await atlp1.save() 
        let atlp2 = new ActualTotalLoad(atl2)
        atlp2 = await atlp2.save()
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
})

afterAll(async() => {
    await request(app).post("/energy/api/Reset")
    mongoose.connection.close()
})

describe("Functional tests, run sequentially.", () => {
    test("T01. Health check status is OK.", async () => {
        const response = await request(app).get("/energy/api/HealthCheck")
        expect(response.body).toEqual({status: "OK"})
        expect(response.statusCode).toBe(200)
    })
    test("T02. The database is reset successfully.", async () => {
        const response = await request(app).post("/energy/api/Reset")
        expect(response.body).toEqual({status: "OK"})
        expect(response.statusCode).toBe(200)
    })
    test("T03. Admin logs in successfully.", async () => {
        request(app)
        .post("/energy/api/Login")
        .send({
            username: "admin",
            password: "321nimda"
        })
        .then(async(response)=>{
            token1 = response.body.token
            let admin = await User.findOne({username: "admin"})
            isLoggedIn = admin.isLoggedIn
            expect(isLoggedIn).toBe(true)
        })
    })
    test("T04. Admin creates a new user.", async () => {
        const response = await request(app)
        .post("/energy/api/Admin/users")
        .send({
            username: "user",
            email: "user@ntua.gr",
            password: "4321resu",
            quota: 100
        })
        .set("X-OBSERVATORY-AUTH", token1)
        expect(response.body.username).toBe("user")
        expect(response.body.email).toBe("user@ntua.gr")
        expect(response.body.quota).toBe(100)
    })
    test("T05. User logs in.", async () => {
        request(app)
        .post("/energy/api/Login")
        .send({
            username: "user",
            password: "4321resu"
        })
        .then(async(response)=>{
            token2 = response.body.token
            user = await User.findOne({username: "user"})
            expect(user.isLoggedIn).toBe(true)
        })
    })
    test("T06. User retrieves ActualTotalLoad tuple for 2000-01-01.", async () => {
        const response = await request(app)
        .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2000-01-01?format=json')
        .set("X-OBSERVATORY-AUTH", token2)
        expect(response.body[0].Source).toEqual(payload1[0].Source)
        expect(response.body[0].Dataset).toEqual(payload1[0].Dataset)
        expect(response.body[0].AreaName).toEqual(payload1[0].AreaName)
        expect(response.body[0].AreaTypeCode).toEqual(payload1[0].AreaTypeCode)
        expect(response.body[0].MapCode).toEqual(payload1[0].MapCode)
        expect(response.body[0].ResolutionCode).toEqual(payload1[0].ResolutionCode)
        expect(response.body[0].Year).toEqual(payload1[0].Year)
        expect(response.body[0].Month).toEqual(payload1[0].Month)
        expect(response.body[0].Day).toEqual(payload1[0].Day)
        expect(response.body[0].ActualTotalLoadValue).toEqual(payload1[0].ActualTotalLoadValue)
    })
    test("T07. Admin limits the quota of the new user.", async () => {
        const response = await request(app)
        .put('/energy/api/Admin/users/user')
        .send({
            email: "user@ntua.gr",
            quota: 1
        })
        .set("X-OBSERVATORY-AUTH", token1)
        expect(response.body).toEqual({"username":"user", "email":"user@ntua.gr", "quota":1})
        expect(response.body.quota).toBe(1)
    })
    test("T08. User cannot read ActualTotalLoad tuple for 2000-01-02 due to quota limit.", async () => {
        let user = await User.findOne({username: "user"})
        user.quota = 0
        user.save(async() => {
            const response = await request(app)
            .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2000-01-02?format=json')
            .set("X-OBSERVATORY-AUTH", token2)
            expect(response.statusCode).toBe(402)
        })
    })
    test("T09. Admin updates the quota of the new user again.", async () => {
        const response = await request(app)
        .put('/energy/api/Admin/users/user')
        .send({
            email: "user@ntua.gr",
            quota: 10
        })
        .set("X-OBSERVATORY-AUTH", token1)
        expect(response.body).toEqual({"username":"user", "email":"user@ntua.gr", "quota":10})
        expect(response.body.quota).toBe(10)
    })
    test("T10. Admin logs out.", async () => {
        request(app)
        .post("/energy/api/Logout")
        .set("X-OBSERVATORY-AUTH", token1)
        .then(async() => {
            let admin = await User.findOne({username: "admin"})
            expect(admin.isLoggedIn).toBe(false)
        })
    })
    test("T11. User retrieves ActualTotalLoad tuple for 2000-01-02.", async () => {
        const response = await request(app)
        .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2000-01-02?format=json')
        .set("X-OBSERVATORY-AUTH", token2)
        expect(response.body[0].Source).toEqual(payload2[0].Source)
        expect(response.body[0].Dataset).toEqual(payload2[0].Dataset)
        expect(response.body[0].AreaName).toEqual(payload2[0].AreaName)
        expect(response.body[0].AreaTypeCode).toEqual(payload2[0].AreaTypeCode)
        expect(response.body[0].MapCode).toEqual(payload2[0].MapCode)
        expect(response.body[0].ResolutionCode).toEqual(payload2[0].ResolutionCode)
        expect(response.body[0].Year).toEqual(payload2[0].Year)
        expect(response.body[0].Month).toEqual(payload2[0].Month)
        expect(response.body[0].Day).toEqual(payload2[0].Day)
        expect(response.body[0].ActualTotalLoadValue).toEqual(payload2[0].ActualTotalLoadValue)
    })
    test("T12. User logs out.", async () => {
        request(app)
        .post("/energy/api/Logout")
        .set("X-OBSERVATORY-AUTH", token2)
        .then(async() => {
            let user = await User.findOne({username: "user"})
            expect(user.isLoggedIn).toBe(false)
        })
    })
    test("T13. Anonymous users cannot access protected resources.", async () => {
        const response = await request(app)
            .get('/energy/api/ActualTotalLoad/Greece/PT60M/date/2000-01-02?format=json')
            expect(response.statusCode).toBe(401)
    })
})