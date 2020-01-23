module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/agptController.js');
    const { auth } = require('../middleware/auth.js');

    app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF/date/:DateF', auth, findByDay);
    app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF/month/:MonthF', auth, findByMonth);
    app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF/year/:YearF', auth, findByYear);
    // app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF', auth, notes.findByDay);
}