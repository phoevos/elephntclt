const mongoose = require('mongoose');

const ResolutionCode = mongoose.model('ResolutionCode', new mongoose.Schema({
    EntityCreatedAt: {
        type: Date,
        required: true
    },
    EntityModifiedAt: {
        type: Date,
        required: true
    },
    ResolutionCodeText: {
        type: String,
        required: true,
        unique: true
    },
    ResolutionCodeNote: {
        type: String
    }
}), 'ResolutionCode');

exports.ResolutionCode = ResolutionCode;