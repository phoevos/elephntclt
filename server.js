const app = require('./app')
const mongoose = require('mongoose')
const https = require('https')
const config = require('config')

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

// Configuring the database
const db = config.get('db')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.");
});

// https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: config.get('ssl')
// }, app)
// .listen(8765);