module.exports = (app) => {
    const {logout} = require('../controllers/logoutController')
    const { auth } = require('../middleware/auth')

    app.post('/energy/api/Logout', auth, logout);
}