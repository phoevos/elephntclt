const {User} = require('../models/user')

function logout(req, res){
    User.updateOne({username: req.user.username}, {isLoggedIn: false}, () => {
        res.status(200).send()
    })
}
exports.logout = logout