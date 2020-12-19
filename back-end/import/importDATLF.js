const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const mongoose = require('mongoose');

function importDATLF(ress, inDB){
    let url = "mongodb://localhost:27017/";
    let stream = fs.createReadStream('./wena/indlovu');
    let csvData = [];
    let first = true;
    let csvStream = fastcsv
        .parse({ delimiter: ';' })
        .on("data", function (data) {
            if (first) {
                first = false;
                return;
            }
            csvData.push({
                _id: mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + data[0]).substr(-24)),
                EntityCreatedAt: data[1],
                EntityModifiedAt: data[2],
                ActionTaskID: data[3],
                Status: data[4],
                Year: Number(data[5]),
                Month: Number(data[6]),
                Day: Number(data[7]),
                DateTime: data[8],
                AreaName: data[9],
                UpdateTime: data[10],
                TotalLoadValue: data[11],
                AreaTypeCodeId: mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + data[12]).substr(-24)),
                AreaCodeId: mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + data[13]).substr(-24)),
                ResolutionCodeId: mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + data[14]).substr(-24)),
                MapCodeId: mongoose.Types.ObjectId.createFromHexString(('000000000000000000000000' + data[15]).substr(-24)),
                RowHash: data[16]
            });
        })
        .on("end", function () {
            inFile = csvData.length
            mongodb.connect(
                url,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    if (err) throw err;

                    client
                        .db("energy")
                        .collection("DayAheadTotalLoadForecast")
                        .insertMany(csvData, (err, res) => {
                            if (err) throw err;
                            let imported = res.insertedCount
                            return ress.status(200).send({
                                totalRecordsInFile: csvData.length,
                                totalRecordsImported: imported,
                                totalRecordsInDB: (inDB + imported)
                            })
                        });
                }
            );
        });

    stream.pipe(csvStream);
}
exports.importDATLF = importDATLF