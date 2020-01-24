const mongoose = require('mongoose');
const User = require('../models/user');

async function reset(req, res) {
    await mongoose.connection.db.dropDatabase()
    const user = new User({
        username: "admin",
        password: "321nimda",
        isAdmin: true
    })
    const result = await user.save()
    res.send({status:"OK"})
}  
exports.reset = reset