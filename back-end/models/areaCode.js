const mongoose = require('mongoose');

const AreaCode = mongoose.model('AreaCode', new mongoose.Schema({
    EntityCreatedAt: {
        type: Date,
        required: true
    },
    EntityModifiedAt: {
        type: Date,
        required: true
    },
    MRID: {
        type: String
    },
    DocStatusValue: {
        type: String
    },
    AttributeInstanceComponent: {
        type: String
    },
    LongNames: {
        type: String
    },
    DisplayNames: {
        type: String
    },
    LastRequestDateAndOrTime: {
        type: Date
    },
    DeactivateRequestDateAndOrTime: {
        type: Date
    },
    MarketParticipantStreetAddressCountry: {
        type: String
    },
    MarketParticipantACERCode: {
        type: String
    },
    MarketParticipantVATCode: {
        type: String
    },
    Description: {
        type: String
    },
    EICParentMarketDocumentMRID: {
        type: String
    },
    ELCResponsibleMarketParticipantMRID: {
        type: String
    },
    IsDeleted: {
        type: Number,
        required: true
    }    
}), 'AreaCode');

exports.AreaCode = AreaCode;