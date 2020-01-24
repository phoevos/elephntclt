const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    quota: Number,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    apikey: String,
}, {
    timestamps: false
});

module.exports = mongoose.model('User', UserSchema,'User');