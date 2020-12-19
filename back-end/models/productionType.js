const mongoose = require('mongoose');

const ProductionType = mongoose.model('ProductionType', new mongoose.Schema({
    EntityCreatedAt: {
        type: Date,
        required: true
    },
    EntityModifiedAt: {
        type: Date,
        required: true
    },
    ProductionTypeText: {
        type: String
    },
    ProductionTypeNote: {
        type: String
    }
}), 'ProductionType');

exports.ProductionType = ProductionType;