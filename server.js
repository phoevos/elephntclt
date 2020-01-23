const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
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
// require('./routes/agptRoutes.js')(app);
//require('./routes/avfRoutes.js')(app);

// listen for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.");
});