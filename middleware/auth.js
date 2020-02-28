const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next){
    const token = req.header('X-OBSERVATORY-AUTH')
    if(!token) return res.status(401).send('Access denied. No token provided.')
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    }
    catch{
        res.status(400).send('Access denied. Invalid Token.')
    }
}
exports.auth = auth;