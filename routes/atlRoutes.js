module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/atlController.js');
    const { auth } = require('../middleware/auth.js');

    app.get('/energy/api/ActualTotalLoad/:AreaNameF/:ResolutionF/date/:DateF', auth, findByDay);
    app.get('/energy/api/ActualTotalLoad/:AreaNameF/:ResolutionF/month/:MonthF', auth, findByMonth);
    app.get('/energy/api/ActualTotalLoad/:AreaNameF/:ResolutionF/year/:YearF', auth, findByYear);
    // app.get('/energy/api/ActualTotalLoad/:AreaNameF/:ResolutionF', auth, findByDay);
}