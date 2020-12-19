const mongoose = require('mongoose')
const {MapCode} = require('../../models/mapCode')
const {ResolutionCode} = require('../../models/resolutionCode')
const {AreaTypeCode} = require('../../models/areaTypeCode')

const db = "mongodb://localhost:27017/energy_test"

// Connecting to the database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(async() => {
    await importMap()
    await importResolution()
    await importAreaType()
    mongoose.connection.close()
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

async function importMap(){
    let map = new MapCode({
        _id: mongoose.Types.ObjectId('000000000000000000000002'),
        EntityCreatedAt: "2020-03-01 12:27:36.7610129 +00:00",
        EntityModifiedAt: "2020-03-01 12:27:36.7610129 +00:00",
        MapCodeText: "Foo",
        MapCodeNote: "NULL"
    })
    map.save(()=>{
        console.log("MapCode inserted.")
    })
}

async function importResolution(){
    let resolution = new ResolutionCode({
        _id: mongoose.Types.ObjectId('000000000000000000000002'),
        EntityCreatedAt: "2020-03-01 12:27:36.7610129 +00:00",
        EntityModifiedAt: "2020-03-01 12:27:36.7610129 +00:00",
        ResolutionCodeText: "PT60M",
        ResolutionCodeNote: "NULL"
    })
    resolution.save(()=>{
        console.log("ResolutionCode inserted.")
    })
}

async function importAreaType(){
    let areaType = new AreaTypeCode({
        _id: mongoose.Types.ObjectId('000000000000000000000002'),
        EntityCreatedAt: "2020-03-01 12:27:36.7610129 +00:00",
        EntityModifiedAt: "2020-03-01 12:27:36.7610129 +00:00",
        AreaTypeCodeText: "GR",
        AreaTypeCodeNote: "NULL"
    })
    areaType.save(()=>{
        console.log("AreaTypeCode inserted.")
    })
}