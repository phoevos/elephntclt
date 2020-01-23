const ATL = require('../models/actualTotalLoad.js');
const ATL = require('../models/dayAheadTotalLoadForecast.js');
const csv = require('csv-express')

function resolutionCodeToInt(area_str) {
    var resolutionCodeNum;
    if (area_str == 'PT15M') resolutionCodeNum = 1;
    else if (area_str == 'PT30M') resolutionCodeNum = 2;
    else if (area_str == 'PT60M') resolutionCodeNum = 3;
    else resolutionCodeNum = 99;

    return resolutionCodeNum;
}

exports.findByDay = (req, res) => {
    ATL.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCodeToInt(req.params.ResolutionF), Year: req.params.YearF || new Date().getFullYear(), Month: req.params.MonthF || (new Date().getMonth() + 1), Day: req.params.DayF || new Date().getDate() }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCode', 'AreaTypeCodeText').
        populate('MapCode', 'MapCodeText').
        populate('ResolutionCode', 'ResolutionCodeText').
        lean().
        exec({}, function (err, results) {
            if (err) res.send(err);
            var i, ret;
            const rLength = results.length;
            if (rLength) {
                for (i = 0; i < rLength; i++) {
                    ret = {
                        Source: 'entso-e',
                        Dataset: 'ActualTotalLoad',
                        AreaName: results[i].AreaName,
                        AreaTypeCode: results[i].AreaTypeCode.AreaTypeCodeText,
                        MapCode: results[i].MapCode.MapCodeText,
                        ResolutionCode: results[i].ResolutionCode.ResolutionCodeText,
                        Year: results[i].Year,
                        Month: results[i].Month,
                        Day: results[i].Day,
                        DateTimeUTC: results[i].DateTime,
                        ActualTotalLoadValue: results[i].ActualTotalLoadValue,
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
        });
}

exports.findByMonth = (req, res) => {
    ATL.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCodeToInt(req.params.ResolutionF), Year: req.params.YearF, Month: req.params.MonthF }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCode', 'AreaTypeCodeText').
        populate('MapCode', 'MapCodeText').
        populate('ResolutionCode', 'ResolutionCodeText').
        lean().
        exec({}, function (err, results) {
            if (err) res.send(err);
            var i, ret;
            var totals = [];
            const rLength = results.length;
            if (rLength) {
                results.forEach(function (item) {
                    totals[item.Day] += item.ActualTotalLoadValue;
                });
                const tLength = totals.length;
                for (i = 1; i < tLength; i++) {
                    ret = {
                        Source: 'entso-e',
                        Dataset: 'ActualTotalLoad',
                        AreaName: results[i].AreaName,
                        AreaTypeCode: results[i].AreaTypeCode.AreaTypeCodeText,
                        MapCode: results[i].MapCode.MapCodeText,
                        ResolutionCode: results[i].ResolutionCode.ResolutionCodeText,
                        Year: results[i].Year,
                        Month: results[i].Month,
                        Day: i,
                        ActualTotalLoadByDayValue: totals[i]
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
        });
}

exports.findByYear = (req, res) => {
    ATL.
        find({ AreaName: req.params.AreaNameF, ResolutionCodeId: resolutionCodeToInt(req.params.ResolutionF), Year: req.params.YearF }).
        sort({ DateTime: 1 }).
        populate('AreaTypeCode', 'AreaTypeCodeText').
        populate('MapCode', 'MapCodeText').
        populate('ResolutionCode', 'ResolutionCodeText').
        lean().
        exec({}, function (err, results) {
            if (err) res.send(err);
            var i, ret;
            var totals = [];
            const rLength = results.length;
            if (rLength) {
                results.forEach(function (item) {
                    totals[item.Month] += item.ActualTotalLoadValue;
                });
                const tLength = totals.length;
                for (i = 1; i < tLength; i++) {
                    ret = {
                        Source: 'entso-e',
                        Dataset: 'ActualTotalLoad',
                        AreaName: results[i].AreaName,
                        AreaTypeCode: results[i].AreaTypeCode.AreaTypeCodeText,
                        MapCode: results[i].MapCode.MapCodeText,
                        ResolutionCode: results[i].ResolutionCode.ResolutionCodeText,
                        Year: results[i].Year,
                        Month: i,
                        ActualTotalLoadByMonthValue: totals[i]
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
        });
}
