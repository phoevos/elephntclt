const config = require('config')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const bb = require('express-busboy')
const cors = require('cors')
// const util = require('util');

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}
// create express app
const app = express();

// enable cors
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// parse multipart/form-data
app.use(busboyBodyParser())
// bb.extend(app)

// Configuring the database
const db = config.get('db')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// mongoose.set('debug', (collection, method, query, doc) => {
//     const iquery = util.inspect(query, false, 30);
//     const idoc = util.inspect(doc, false, 30);
//     console.log(`${collection}.${method}\n${iquery}\n${idoc}`);
//   });

require('./routes/atlRoutes.js')(app);
require('./routes/datlfRoutes.js')(app);
require('./routes/agptRoutes.js')(app);
require('./routes/avfRoutes.js')(app);
require('./routes/healthCheckRoutes.js')(app);
require('./routes/resetRoutes.js')(app);
require('./routes/adminRoutes.js')(app);
require('./routes/loginRoutes.js')(app);
require('./routes/logoutRoutes.js')(app);

// listen for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.");
});