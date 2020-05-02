const mongoose = require('mongoose');
const config = require('config')

const db = config.get('db')

exports.healthCheck = (req, res) => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        res.send({status:"OK"})
    }).catch(err => {
        console.log('Could not connect to the database.', err);
        process.exit();
    });
}