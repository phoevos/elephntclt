const {User} = require('../models/user');
const {ActualTotalLoad} = require('../models/actualTotalLoad');
const {DayAheadTotalLoadForecast} = require('../models/dayAheadTotalLoadForecast');
const {AggregatedGenerationPerType} = require('../models/aggregatedGenerationPerType');
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
    try {
        await user.save()
    }
    catch{
        return res.status(500).send('Failed to create user.')
    }
    res.status(200).send(_.pick(user, ['username', 'email', 'quota']))
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

    try{
        // const salt = await bcrypt.genSalt(10)
        // bcrypt.hash(user.password, salt, async(err, pwd) => {
        //     if(err) throw err
        //     user.email = req.body.email
        //     user.quota = req.body.quota
        //     user.password = pwd
        //     user = await user.save()
        // })
        
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        user.email = req.body.email
        user.quota = req.body.quota
        user = await user.save()
    }
    catch{
        return res.status(500).send('Failed to update user data.')
    }
    res.status(200).send(_.pick(user, ['username', 'email', 'quota']))
}
exports.modUser = modUser

async function postDataset(req, res) {
    let dataset = req.params.DatasetF
    if(dataset == 'ActualTotalLoad') {
        ActualTotalLoad.countDocuments((inDB)=>{
            importATL(res, inDB)
        })
    } 
    else if(dataset == 'DayAheadTotalLoadForecast') {
        DayAheadTotalLoadForecast.countDocuments((inDB)=>{
            importDATLF(res, inDB)
        })
    }
    else if(dataset == 'AggregatedGenerationPerType') {
        AggregatedGenerationPerType.countDocuments((inDB)=>{
            importAGPT(res, inDB)
        })
    }
    else {
        return res.status(400).send('A valid dataset must be provided.') 
    }
}
exports.postDataset = postDataset