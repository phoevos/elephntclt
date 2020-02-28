const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    quota: {
        type: Number
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
        unique: true, 
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: false
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt
    .sign({username: this.username, email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema,'User');

exports.User = User