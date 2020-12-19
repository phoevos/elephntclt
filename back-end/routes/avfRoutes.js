module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/avfController.js');
    const { auth } = require('../middleware/auth.js');
    const { quota } = require('../middleware/quota.js');

    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/date/:DateF', [auth, quota], findByDay);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/month/:MonthF', [auth, quota], findByMonth);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/year/:YearF', [auth, quota], findByYear);
}