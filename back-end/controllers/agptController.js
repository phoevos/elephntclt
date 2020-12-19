const {AggregatedGenerationPerType} = require('../models/aggregatedGenerationPerType.js');
const {ProductionType} = require('../models/productionType.js');
const {ResolutionCode} = require('../models/resolutionCode.js');
const {MapCode} = require('../models/mapCode.js');
const {AreaTypeCode} = require('../models/areaTypeCode.js');
const csv = require('csv-express')
const mongoose = require('mongoose');

function resolutionCodeMap(area_str) {
    let resolutionCodeNum;
    if (area_str == 'PT15M') resolutionCodeNum = '000000000000000000000001';
    else if (area_str == 'PT30M') resolutionCodeNum = '000000000000000000000003';
    else if (area_str == 'PT60M') resolutionCodeNum = '000000000000000000000002';
    else resolutionCodeNum=99;

    return resolutionCodeNum;
}

async function productionTypeMap(prod_str) {
    if (prod_str == 'AllTypes') 
        return 0
    else {
       let productionTypeNum = await ProductionType
            .findOne({ProductionTypeText: prod_str})
        
        return productionTypeNum._id
    }
}

async function productionTable(){
    let productionTypes = await ProductionType.find({})
    for(i=0; i<productionTypes.length; i++){
        productionTypes[i] = productionTypes[i].ProductionTypeText
    }
    return productionTypes
}

async function findByDay(req, res) {
    const year = req.params.DateF.substr(0, 4)
    const month = req.params.DateF.substr(5, 2)
    const day = req.params.DateF.substr(8, 2)
    let productionType
    try{
        productionType = await productionTypeMap(req.params.ProductionTypeF)
    }
    catch{
        return res.status(400).send('Invalid Production Type.')
    }
    let results
    if (productionType == 0) {
        try{
            results = await AggregatedGenerationPerType.
            find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year, Month: month, Day: day }).
            sort({ DateTime: 1 }).
            populate('AreaTypeCodeId', 'AreaTypeCodeText').
            populate('ProductionTypeId', 'ProductionTypeText').
            populate('MapCodeId', 'MapCodeText').
            populate('ResolutionCodeId', 'ResolutionCodeText')
        }
        catch{
            return res.status(400).send('Invalid Parameters.')
        }  
    }
    else {
        try{
            results = await AggregatedGenerationPerType.
                 find({ AreaName: req.params.AreaNameF, ProductionTypeId: productionType, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year, Month: month, Day: day }).
                 sort({ DateTime: 1 }).
                 populate('AreaTypeCodeId', 'AreaTypeCodeText').
                 populate('ProductionTypeId', 'ProductionTypeText').
                 populate('MapCodeId', 'MapCodeText').
                 populate('ResolutionCodeId', 'ResolutionCodeText')
        }
        catch{
            return res.status(400).send('Invalid Parameters.')
        }
    }
    var i, ret;
    const rLength = results.length;
    if (rLength) {
        for (i = 0; i < rLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'AggregatedGenerationPerType',
                AreaName: results[i].AreaName,
                AreaTypeCode: results[i].AreaTypeCodeId.AreaTypeCodeText,
                MapCode: results[i].MapCodeId.MapCodeText,
                ResolutionCode: results[i].ResolutionCodeId.ResolutionCodeText,
                Year: results[i].Year,
                Month: results[i].Month,
                Day: results[i].Day,
                DateTimeUTC: results[i].DateTime,
                ProductionType: results[i].ProductionTypeId.ProductionTypeText,
                ActualGenerationOutputValue: results[i].ActualGenerationOutput,
                UpdateTimeUTC: results[i].UpdateTime
            };
            results[i] = ret;
        }
        if (req.query.format == 'csv') {
            var filename = "results.csv";
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' + filename);
            res.csv(results, true);
        }
        else if (req.query.format == 'json' || req.query.format === undefined) {
            res.json(results);
        }
        else {
            res.status(400).send("The requested data format is not available.");
        }
    }
    else {
        res.status(403).send("The requested data is not available.");
    }
}
exports.findByDay = findByDay

async function findByMonth(req, res) {
    const year = req.params.MonthF.substr(0, 4)
    const month = req.params.MonthF.substr(5, 2)
    let productionType
    try{
        productionType = await productionTypeMap(req.params.ProductionTypeF)
    }
    catch{
        return res.status(400).send('Invalid Production Type.')
    }
    let i, ret;
    let maxDay = 1
    let totals
    let results
    if (productionType == 0) {
        results = await AggregatedGenerationPerType.
            find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year, Month: month }).
            sort({ DateTime: 1 }).
            populate('AreaTypeCodeId', 'AreaTypeCodeText').
            populate('ProductionTypeId', 'ProductionTypeText').
            populate('MapCodeId', 'MapCodeText').
            populate('ResolutionCodeId', 'ResolutionCodeText')
        const rLength = results.length;
        if(!rLength) return res.status(403).send("The requested data is not available.")
        const areaName = results[0].AreaName
        const areaTypeCode = results[0].AreaTypeCodeId.AreaTypeCodeText
        const mapCode = results[0].MapCodeId.MapCodeText
        const resolutionCode = results[0].ResolutionCodeId.ResolutionCodeText
        const yearN = results[0].Year
        const monthN = results[0].Month
        const productionTypes = await productionTable()
        totals = new Array(768).fill(0)
        results.forEach(function (item) {
            if(item.Day > maxDay) {
                maxDay = item.Day
            }
            totals[item.Day*24 + parseInt(item.ProductionTypeId._id, 10) - 24] += item.ActualGenerationOutput
        });
        const tLength = maxDay*24 + 1;
        let count = 0
        for (i = 1; i < tLength; i += 24) {
            for(j = 0; j<24; j++){
                if(totals[i+j] != 0){
                    ret = {
                        Source: 'entso-e',
                        Dataset: 'AggregatedGenerationPerType',
                        AreaName: areaName,
                        AreaTypeCode: areaTypeCode,
                        MapCode: mapCode,
                        ResolutionCode: resolutionCode,
                        Year: yearN,
                        Month: monthN,
                        Day: Math.floor(i/24) + 1,
                        ProductionType: productionTypes[j],
                        ActualGenerationOutputByDayValue: totals[i+j]
                    };
                    results[count++] = ret;
                }
            }
        }
        results.splice(count)
    }
    else {
        results = await AggregatedGenerationPerType.
            find({ AreaName: req.params.AreaNameF, ProductionTypeId: productionType, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year, Month: month }).
            sort({ DateTime: 1 }).
            populate('AreaTypeCodeId', 'AreaTypeCodeText').
            populate('ProductionTypeId', 'ProductionTypeText').
            populate('MapCodeId', 'MapCodeText').
            populate('ResolutionCodeId', 'ResolutionCodeText')
        const rLength = results.length;
        if(!rLength) return res.status(403).send("The requested data is not available.")
        const areaName = results[0].AreaName
        const areaTypeCode = results[0].AreaTypeCodeId.AreaTypeCodeText
        const mapCode = results[0].MapCodeId.MapCodeText
        const resolutionCode = results[0].ResolutionCodeId.ResolutionCodeText
        const yearN = results[0].Year
        const monthN = results[0].Month
        const prodType = req.params.ProductionTypeF
        totals = new Array(32).fill(0)
        results.forEach(function (item) {
            if(item.Day > maxDay) {
                maxDay = item.Day
            }
            totals[item.Day] += item.ActualGenerationOutput;
        });
        const tLength = maxDay+1;
        for (i = 1; i < tLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'AggregatedGenerationPerType',
                AreaName: areaName,
                AreaTypeCode: areaTypeCode,
                MapCode: mapCode,
                ResolutionCode: resolutionCode,
                Year: yearN,
                Month: monthN,
                Day: i,
                ProductionType: prodType,
                ActualGenerationOutputByDayValue: totals[i]
            };
            results[i] = ret;
        }
        results.splice(tLength);
        results.splice(0, 1);
    }
    if (req.query.format == 'csv') {
        var filename = "results.csv";
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename=' + filename);
        res.csv(results, true);
    }
    else if (req.query.format == 'json' || req.query.format === undefined) {
        res.json(results);
    }
    else {
        res.status(400).send("The requested data format is not available.");
    }
}
exports.findByMonth = findByMonth

async function findByYear(req, res) {
    const year = req.params.YearF.substr(0, 4)
    let productionType
    try{
        productionType = await productionTypeMap(req.params.ProductionTypeF)
    }
    catch{
        return res.status(400).send('Invalid Production Type.')
    }
    let results, i, ret, totals
    let maxMonth = 1
    if (productionType == 0) {
        try{
            results = await AggregatedGenerationPerType.
            find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year }).
            sort({ DateTime: 1 }).
            populate('AreaTypeCodeId', 'AreaTypeCodeText').
            populate('ProductionTypeId', 'ProductionTypeText').
            populate('MapCodeId', 'MapCodeText').
            populate('ResolutionCodeId', 'ResolutionCodeText')
        }
        catch{
            return res.status(400).send('Invalid Parameters.')
        }
        const rLength = results.length;
        if(!rLength) return res.status(403).send("The requested data is not available.")
        const areaName = results[0].AreaName
        const areaTypeCode = results[0].AreaTypeCodeId.AreaTypeCodeText
        const mapCode = results[0].MapCodeId.MapCodeText
        const resolutionCode = results[0].ResolutionCodeId.ResolutionCodeText
        const yearN = results[0].Year
        const productionTypes = await productionTable()
        totals = new Array(312).fill(0)
        results.forEach(function (item) {
            if(item.Month > maxMonth) {
                maxMonth = item.Month
            }
            totals[item.Month*24 + parseInt(item.ProductionTypeId._id, 10) - 24] += item.ActualGenerationOutput
        });
        const tLength = maxMonth*24 + 1;
        let count = 0
        for (i = 1; i < tLength; i += 24) {
            for(j = 0; j<24; j++){
                if(totals[i+j] != 0){
                    ret = {
                        Source: 'entso-e',
                        Dataset: 'AggregatedGenerationPerType',
                        AreaName: areaName,
                        AreaTypeCode: areaTypeCode,
                        MapCode: mapCode,
                        ResolutionCode: resolutionCode,
                        Year: yearN,
                        Month: Math.floor(i/24) + 1,
                        ProductionType: productionTypes[j],
                        ActualGenerationOutputByDayValue: totals[i+j]
                    };
                    results[count++] = ret;
                }
            }
        }
        results.splice(count)
    }
    else {
        try{
            results = await AggregatedGenerationPerType.
            find({ AreaName: req.params.AreaNameF, ProductionTypeId: productionType, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year }).
            sort({ DateTime: 1 }).
            populate('AreaTypeCodeId', 'AreaTypeCodeText').
            populate('ProductionTypeId', 'ProductionTypeText').
            populate('MapCodeId', 'MapCodeText').
            populate('ResolutionCodeId', 'ResolutionCodeText')
        }
        catch{
            return res.status(400).send('Invalid Parameters.')
        }
        const rLength = results.length;
        if(!rLength) return res.status(403).send("The requested data is not available.")
        const areaName = results[0].AreaName
        const areaTypeCode = results[0].AreaTypeCodeId.AreaTypeCodeText
        const mapCode = results[0].MapCodeId.MapCodeText
        const resolutionCode = results[0].ResolutionCodeId.ResolutionCodeText
        const yearN = results[0].Year
        const prodType = req.params.ProductionTypeF
        totals = new Array(13).fill(0)
        results.forEach(function (item) {
            if(item.Month > maxMonth) {
                maxMonth = item.Month
            }
            totals[item.Month] += item.ActualGenerationOutput;
        });
        const tLength = maxMonth+1;
        for (i = 1; i < tLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'AggregatedGenerationPerType',
                AreaName: areaName,
                AreaTypeCode: areaTypeCode,
                MapCode: mapCode,
                ResolutionCode: resolutionCode,
                Year: yearN,
                Month: i,
                ProductionType: prodType,
                ActualGenerationOutputByMonthValue: totals[i]
            };
            results[i] = ret;
        }
        results.splice(tLength);
        results.splice(0, 1);
    }
    if (req.query.format == 'csv') {
        var filename = "results.csv";
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename=' + filename);
        res.csv(results, true);
    }
    else if (req.query.format == 'json' || req.query.format === undefined) {
        res.json(results);
    }
    else {
        res.status(400).send("The requested data format is not available.");
    }
}
exports.findByYear = findByYear