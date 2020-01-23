const mongoose = require('mongoose');

const AreaTypeCode = mongoose.model('AreaTypeCode', new mongoose.Schema({
    EntityCreatedAt: {
        type: Date,
        required: true
    },
    EntityModifiedAt: {
        type: Date,
        required: true
    },
    AreaTypeCodeText: {
        type: String
    },
    AreaTypeCodeNote: {
        type: String
    }
}), 'AreaTypeCode');

exports.AreaTypeCode = AreaTypeCode;