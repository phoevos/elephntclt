const mongoose = require('mongoose');
const dbConfig = require('../config/database.config.js');


exports.healthCheck = (req, res) => {
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        res.send({status:"OK"})  
    }).catch(err => {
        console.log('Could not connect to the database.', err);
        process.exit();
    });
}