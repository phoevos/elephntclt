const mongoose = require('mongoose');

const MapCode = mongoose.model('MapCode', new mongoose.Schema({
    EntityCreatedAt: {
        type: Date,
        required: true
    },
    EntityModifiedAt: {
        type: Date,
        required: true
    },
    MapCodeText: {
        type: String,
        required: true,
        unique: true
    },
    MapCodeNote: {
        type: String
    }
}), 'MapCode');

exports.MapCode = MapCode;