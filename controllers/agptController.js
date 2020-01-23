const {AggregatedGenerationPerType} = require('../models/aggregatedGenerationPerType.js');
const {ResolutionCode} = require('../models/resolutionCode.js');
const {MapCode} = require('../models/mapCode.js');
const {AreaTypeCode} = require('../models/areaTypeCode.js');
const {ProductionType} = require('../models/productionType.js');
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
// TO DO:
// -FIX NAMES IN ACCORDANCE TO MODEL
// -SEPARATE QUERY FOR PRODUCTION TYPE

async function findByDay(req, res) {
    const year = req.params.DateF.substr(0, 4)
    const month = req.params.DateF.substr(5, 2)
    const day = req.params.DateF.substr(8, 2)
    let results = await AggregatedGenerationPerType.
        find({ AreaName: req.params.AreaNameF, ProductionTypeId: req.params.ProductionTypeF, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year, Month: month, Day: day }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('ProductionTypeId', 'ProductionTypeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
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
    let results = await AggregatedGenerationPerType.
        find({ AreaName: req.params.AreaNameF, ProductionTypeId: req.params.ProductionTypeF, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year, Month: month }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('ProductionTypeId', 'ProductionTypeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    var i, ret;
    let maxDay = 1
    let totals = new Array(32).fill(0);
    const rLength = results.length;
    if (rLength) {
        results.forEach(function (item) {
            if(item.Day > maxDay) {
                maxDay = item.Day
            }
            totals[item.Day] += item.AggregatedGenerationPerTypeValue;
        });
        const tLength = maxDay+1;
        for (i = 1; i < tLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'AggregatedGenerationPerType',
                AreaName: results[i].AreaName,
                AreaTypeCode: results[i].AreaTypeCodeId.AreaTypeCodeText,
                MapCode: results[i].MapCodeId.MapCodeText,
                ResolutionCode: results[i].ResolutionCodeId.ResolutionCodeText,
                Year: results[i].Year,
                Month: results[i].Month,
                Day: i,
                ActualGenerationOutputByDayValue: totals[i]
            };
            results[i] = ret;
        }
        results.splice(tLength);
        results.splice(0, 1);
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
exports.findByMonth = findByMonth

async function findByYear(req, res) {
    const year = req.params.YearF.substr(0, 4)
    let results = await AggregatedGenerationPerType.
        find({ AreaName: req.params.AreaNameF, ProductionTypeId: req.params.ProductionTypeF, ResolutionCodeId: resolutionCodeMap(req.params.ResolutionF), Year: year }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('ProductionTypeId', 'ProductionTypeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    var i, ret;
    let maxMonth = 1
    let totals = new Array(13).fill(0);
    const rLength = results.length;
    if (rLength) {
        results.forEach(function (item) {
            if(item.Month > maxMonth) {
                maxMonth = item.Month
            }
            totals[item.Month] += item.AggregatedGenerationPerTypeValue;
        });
        const tLength = maxMonth+1;
        for (i = 1; i < tLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'AggregatedGenerationPerType',
                AreaName: results[i].AreaName,
                AreaTypeCode: results[i].AreaTypeCodeId.AreaTypeCodeText,
                MapCode: results[i].MapCodeId.MapCodeText,
                ResolutionCode: results[i].ResolutionCodeId.ResolutionCodeText,
                Year: results[i].Year,
                Month: i,
                ActualGenerationOutputByMonthValue: totals[i]
            };
            results[i] = ret;
        }
        results.splice(tLength);
        results.splice(0, 1);
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
exports.findByYear = findByYear