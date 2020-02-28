const mongoose = require('mongoose');
const {User} = require('../models/user');
const {ActualTotalLoad} = require('../models/actualTotalLoad');
const {DayAheadTotalLoadForecast} = require('../models/dayAheadTotalLoadForecast');
const {AggregatedGenerationPerType} = require('../models/aggregatedGenerationPerType');
const config = require('config')
const bcrypt = require('bcrypt')

async function plantAdmin(res){
    const salt = await bcrypt.genSalt(10)
    const adminPwd = await bcrypt.hash(config.get('adminPassword'), salt)
    user = new User({
        username: 'admin',
        password: adminPwd,
        email: 'indlovu@wena.gr',
        isAdmin: true
    })
    await user.save()
    res.send({status:"OK"})
}

async function reset(req, res){
    await ActualTotalLoad.deleteMany({})
    await DayAheadTotalLoadForecast.deleteMany({})
    await AggregatedGenerationPerType.deleteMany({})
    mongoose.connection.dropCollection('User', (err, result) => {
        if(err) console.log('Failed to delete the User collection.')
        else plantAdmin(res)
    })
}
exports.reset = reset