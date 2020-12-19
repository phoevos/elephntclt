const express = require('express');
const bodyParser = require('body-parser');
// const busboyBodyParser = require('busboy-body-parser');
// const bb = require('express-busboy')
const cors = require('cors')

// create express app
const app = express();

// enable cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// parse multipart/form-data
// app.use(busboyBodyParser())
// bb.extend(app)

require('./routes/atlRoutes.js')(app);
require('./routes/datlfRoutes.js')(app);
require('./routes/agptRoutes.js')(app);
require('./routes/avfRoutes.js')(app);
require('./routes/healthCheckRoutes.js')(app);
require('./routes/resetRoutes.js')(app);
require('./routes/adminRoutes.js')(app);
require('./routes/loginRoutes.js')(app);
require('./routes/logoutRoutes.js')(app);

module.exports = app