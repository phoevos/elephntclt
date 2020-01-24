const DUsers = require('../models/user');

function JSONnoerr(input) {
    var output;
    try {
        output = JSON.parse(input)
    }
    catch (error) {
        output = JSON.parse("{\"username\": \"\",\"password\": \"\"}")

    }
    return output
}

function auth(req, res, next) {
    if (!req.query.apikey) return res.status(401).send('Access denied, no key provided.');
    DUsers.
        findOne({ key: req.query.apikey }).
        lean().
        exec({}, function (error, output) {
        if (error) return res.status(400).send(error);

        var creds = JSONnoerr(req.header('X-OBSERVATORY-AUTH'));
        if (creds.username == output.username && creds.password == output.password) {
            next();
        }
        else return res.status(400).send('Wrong credentials');
    });
}

exports.auth = auth;