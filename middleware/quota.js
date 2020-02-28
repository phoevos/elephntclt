const {User} = require('../models/user')

async function quota(req, res, next){
    if(!req.user.isAdmin){
        let user =  await User.findOne({username: req.user.username})
        if(user.quota == 0) return res.status(402).send('No quota.')
        const newQuota = user.quota - 1
        await User.findOneAndUpdate({username: user.username}, {quota: newQuota})
    }    
    next()
}
exports.quota = quota