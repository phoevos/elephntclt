module.exports = (app) => {
    const {login} = require('../controllers/loginController')

    app.post('/energy/api/Login', login);
}