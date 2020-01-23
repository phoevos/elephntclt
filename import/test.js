const {ActualTotalLoad} = require('../models/actualTotalLoad')
const {ResolutionCode} = require('../models/resolutionCode.js');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

async function findBy() {
    const res = await ActualTotalLoad
        .find({ResolutionCodeId: '000000000000000000000002'})
        .populate('ResolutionCodeId', 'ResolutionCodeText')
        .sort({Day: 1})
    console.log(res)
}
// Connecting to the database
mongoose.connect('mongodb://localhost:27017/energy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database.");   
    findBy()
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



