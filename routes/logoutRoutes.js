module.exports = (app) => {
    const {logout} = require('../controllers/logoutController')

    app.post('/energy/api/Logout', logout);
}