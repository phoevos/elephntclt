const {User} = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {importATL} = require('../import/importATL')
const {importDATLF} = require('../import/importDATLF')
const {importAGPT} = require('../import/importAGPT')


async function createUser(req, res) {
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('The provided email is already registered.')
    user = await User.findOne({username: req.body.username})
    if(user) return res.status(400).send('This name is already in use.')

    user = new User({
        quota: req.body.quota,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: req.body.isAdmin || false
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()

    res.status(200).send({
        token: token
    })
}
exports.createUser = createUser

async function getUser(req, res) {
    const user = await User.findOne({username: req.params.UsernameF})
    if(!user) return res.status(400).send('User not found.')

    res.status(200).send(_.pick(user, ['username', 'email', 'quota']))
}
exports.getUser = getUser

async function modUser(req, res) {
    let user = await User.findOne({username: req.params.UsernameF})
    if(!user) return res.status(400).send('User not found.')

    const salt = await bcrypt.genSalt(10)
    newPassword = await bcrypt.hash(req.body.password, salt)
    user = await User.findOneAndUpdate({username: req.params.UsernameF}, {
        username: req.body.username,
        password: newPassword,
        email: req.body.email,
        quota: req.body.quota
    }, {useFindAndModify: false})
    res.status(200).send('User data changed successfully.')
}
exports.modUser = modUser

async function postDataset(req, res) {
    let dataset = req.params.DatasetF
    const source = req.body.source
    if(dataset == 'ActualTotalLoad') dataset = importATL(source)
    else if(dataset == 'DayAheadTotalLoadForecast') dataset = importDATLF(source)
    else if(dataset == 'AggregatedGenerationPerType') dataset = importAGPT(source)
    else return res.status(400).send('A valid dataset must be provided.') 

    return res.status(200).send({
        totalRecordsInFile: dataset.inFile,
        totalRecordsImported: dataset.imported,
        totalRecordsInDatabase: dataset.inDB
    })
}
exports.postDataset = postDataset