const mongoose = require('mongoose');

const ActualTotalLoad = mongoose.model('ActualTotalLoad', new mongoose.Schema({
    EntityCreatedAt: {
        type: Date,
        required: true
    },
    EntityModifiedAt: {
        type: Date,
        required: true
    },
    ActionTaskID: {
        type: Number,
        required: true
    },
    Status: {
        type: String
    },
    Year: {
        type: Number,
        required: true
    },
    Month: {
        type: Number,
        required: true
    },
    Day: {
        type: Number,
        required: true
    },
    DateTime: {
        type: Date,
        required: true
    },
    AreaName: {
        type: String
    },
    UpdateTime: {
        type: Date,
        required: true
    },
    TotalLoadValue: {
        // type: mongoose.Types.Decimal128,
        type: Number,
        required: true
    },
    AreaTypeCodeId: {
        type: mongoose.Types.ObjectId,
        ref: 'AreaTypeCode'
    },
    MapCodeId: {
        type: mongoose.Types.ObjectId,
        ref: 'MapCode'
    },
    AreaCodeId: {
        type: mongoose.Types.ObjectId,
        ref: 'AreaCode'
    },
    ResolutionCodeId: {
        type: mongoose.Types.ObjectId,
        ref: 'ResolutionCode'
    },
    RowHash: {
        type: String
    }
}), 'ActualTotalLoad');


exports.ActualTotalLoad = ActualTotalLoad;