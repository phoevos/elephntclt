module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/datlfController.js');
    const { auth } = require('../middleware/auth.js');
    const { quota } = require('../middleware/quota.js');

    app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF/date/:DateF', [auth, quota], findByDay);
    app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF/month/:MonthF', [auth, quota], findByMonth);
    app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF/year/:YearF', [auth, quota], findByYear);
}