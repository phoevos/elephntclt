const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    quota: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: String,
}, {
    timestamps: false
});

module.exports = mongoose.model('User', UserSchema,'User');