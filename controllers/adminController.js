const {ActualTotalLoad} = require('../models/actualTotalLoad');
const {DayAheadTotalLoadForecast} = require('../models/dayAheadTotalLoadForecast');
const {AggregatedGenerationPerType} = require('../models/aggregatedGenerationPerType');
const User = require('../models/user');
// const csv = require('csv-express')
const mongoose = require('mongoose');

async function createUser(req, res) {
    const user = new User({
        quota: req.body.quota,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: req.body.isAdmin || false,
        token: n
    })
    try {
        await user.save()
        res.status(200).send(user.token)
    }
    catch(err) {
        res.send(err)
    }
}
exports.createUser = createUser

async function getUser(req, res) {
    try {
        const user = await User.findOne({username: UsernameF})
        res.status(200).send(user)
    }
    catch(err) {
        res.send(err)
    }
}
exports.getUser = getUser

async function modUser(req, res) {
    const user = await User.findOneAndUpdate({username: UsernameF})

}
exports.modUser = modUser

async function postDataset(req, res) {

}
exports.postDataset = postDataset