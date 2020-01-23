const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    quota: Number,
    username: String,
    password: String,
    apikey: String,
}, {
    timestamps: false
});

module.exports = mongoose.model('users', UserSchema,'users');