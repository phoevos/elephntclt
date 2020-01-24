module.exports = (app) => {
    const {reset} = require('../controllers/resetController')

    app.post('/energy/api/Reset', reset)
}