module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/avfController.js');
    const { auth } = require('../middleware/auth.js');

    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/:YearF/:MonthF/:DayF', auth, findByDay);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/:YearF/:MonthF', auth, findByMonth);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/:YearF', auth, findByYear);
    // app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF', auth, findByDay);
}