const {ActualTotalLoad} = require('../models/actualTotalLoad.js');
const {DayAheadTotalLoadForecast} = require('../models/dayAheadTotalLoadForecast');
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

async function findByDay(req, res){
    const year = req.params.DateF.substr(0, 4)
    const month = req.params.DateF.substr(5, 2)
    const day = req.params.DateF.substr(8, 2)
    const resolutionCode = resolutionCodeMap(req.params.ResolutionF)
    let resultsATL = await ActualTotalLoad.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCode, Year: year, Month: month , Day: day }).
        sort({DateTime: 1}).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    let resultsDATLF = await DayAheadTotalLoadForecast.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCode, Year: year, Month: month , Day: day }).
        sort({DateTime: 1}).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    let i, ret;
    const rLength = resultsATL.length;
    if (rLength>0) { 
        let results = new Array(rLength)               
        for (i = 0; i < rLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'ActualVSForecastedTotalLoad',
                AreaName: resultsATL[i].AreaName,
                AreaTypeCode: resultsATL[i].AreaTypeCodeId.AreaTypeCodeText,
                MapCode: resultsATL[i].MapCodeId.MapCodeText,
                ResolutionCode: resultsATL[i].ResolutionCodeId.ResolutionCodeText,
                Year: resultsATL[i].Year,
                Month: resultsATL[i].Month,
                Day: resultsATL[i].Day,
                DateTimeUTC: resultsATL[i].DateTime,
                DayAheadTotalLoadForecastValue: resultsDATLF[i].TotalLoadValue,
                ActualTotalLoadValue: resultsATL[i].TotalLoadValue
            };
            results[i] = ret;                    
        } 
        if (req.query.format == 'csv') {
            let filename = "results.csv";
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

async function findByMonth(req, res){
    const year = req.params.MonthF.substr(0, 4)
    const month = req.params.MonthF.substr(5, 2)
    const resolutionCode = resolutionCodeMap(req.params.ResolutionF)
    let resultsATL = await ActualTotalLoad.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCode, Year: year, Month: month }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    let resultsDATLF = await DayAheadTotalLoadForecast.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCode, Year: year, Month: month }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    let i, ret;
    let maxDay = 1
    let totalsATL = new Array(32).fill(0);
    let totalsDATLF = new Array(32).fill(0);
    const rLength = resultsATL.length;            
    if (rLength) {
        let results = new Array(rLength) 
        resultsATL.forEach(function(item) {
            if(item.Day > maxDay) {
                maxDay = item.Day
            }
            totalsATL[item.Day] += item.TotalLoadValue;
        });
        resultsDATLF.forEach(function(item) {
            totalsDATLF[item.Day] += item.TotalLoadValue;
        });
        const tLength = maxDay+1;
        for (i = 1; i < tLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'ActualVSForecastedTotalLoad',
                AreaName: resultsATL[i].AreaName,
                AreaTypeCode: resultsATL[i].AreaTypeCodeId.AreaTypeCodeText,
                MapCode: resultsATL[i].MapCodeId.MapCodeText,
                ResolutionCode: resultsATL[i].ResolutionCodeId.ResolutionCodeText,
                Year: resultsATL[i].Year,
                Month: resultsATL[i].Month,
                Day: i,
                DayAheadTotalLoadForecastByDayValue: totalsDATLF[i], 
                ActualTotalLoadByDayValue: totalsATL[i]
            };
            results[i] = ret;
        }
        results.splice(tLength);
        results.splice(0, 1);                
        if (req.query.format == 'csv') {
            let filename = "results.csv";
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

async function findByYear(req, res){
    const year = req.params.YearF.substr(0, 4)
    const resolutionCode = resolutionCodeMap(req.params.ResolutionF)
    let resultsATL = await ActualTotalLoad.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCode, Year: year }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    let resultsDATLF = await DayAheadTotalLoadForecast.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCode, Year: year }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCodeId', 'AreaTypeCodeText').
        populate('MapCodeId', 'MapCodeText').
        populate('ResolutionCodeId', 'ResolutionCodeText')
    let i, ret;
    let maxMonth = 1
    let totalsATL = new Array(13).fill(0);
    let totalsDATLF = new Array(13).fill(0);
    const rLength = resultsATL.length;
    if (rLength) {
        let results = new Array(rLength) 
        resultsATL.forEach(function (item) {
            if(item.Month > maxMonth) {
                maxMonth = item.Month
            }
            totalsATL[item.Month] += item.TotalLoadValue;
        });
        resultsDATLF.forEach(function (item) {
            totalsDATLF[item.Month] += item.TotalLoadValue;
        });
        const tLength = maxMonth+1;
        for (i = 1; i < tLength; i++) {
            ret = {
                Source: 'entso-e',
                Dataset: 'ActualVSForecastedTotalLoad',
                AreaName: resultsATL[i].AreaName,
                AreaTypeCode: resultsATL[i].AreaTypeCodeId.AreaTypeCodeText,
                MapCode: resultsATL[i].MapCodeId.MapCodeText,
                ResolutionCode: resultsATL[i].ResolutionCodeId.ResolutionCodeText,
                Year: resultsATL[i].Year,
                Month: i,
                DayAheadTotalLoadForecastByMonthValue: totalsDATLF[i],
                ActualTotalLoadByMonthValue: totalsATL[i]
            };
            results[i] = ret;
        }
        results.splice(tLength);
        results.splice(0, 1);
        if (req.query.format == 'csv') {
            let filename = "results.csv";
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