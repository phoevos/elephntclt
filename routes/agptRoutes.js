module.exports = (app) => {
    const {findByDay, findByMonth, findByYear} = require('../controllers/agptController.js');
    const { auth } = require('../middleware/auth.js');
    const { quota } = require('../middleware/quota.js');

    app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF/date/:DateF', [auth, quota], findByDay);
    app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF/month/:MonthF', [auth, quota], findByMonth);
    app.get('/energy/api/AggregatedGenerationPerType/:AreaNameF/:ProductionTypeF/:ResolutionF/year/:YearF', [auth, quota], findByYear);
}