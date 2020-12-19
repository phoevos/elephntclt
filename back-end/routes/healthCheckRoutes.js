module.exports = (app) => {
    const {healthCheck} = require('../controllers/healthCheckController')

    app.get('/energy/api/HealthCheck', healthCheck)
}