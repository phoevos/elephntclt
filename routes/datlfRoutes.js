module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/datlfController.js');
    const { auth } = require('../middleware/auth.js');

    app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF/date/:DateF', auth, findByDay);
    app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF/month/:MonthF', auth, findByMonth);
    app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF/year/:YearF', auth, findByYear);
    // app.get('/energy/api/DayAheadTotalLoadForecast/:AreaNameF/:ResolutionF', auth, findByDay);
}