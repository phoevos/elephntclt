module.exports = (app) => {
    const notes = require('../controllers/avfController.js');
    const { auth } = require('../middleware/auth.js');

    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/:YearF/:MonthF/:DayF', auth, notes.findByDay);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/:YearF/:MonthF', auth, notes.findByMonth);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF/:YearF', auth, notes.findByYear);
    app.get('/energy/api/ActualvsForecast/:AreaNameF/:ResolutionF', auth, notes.findByDay);
}