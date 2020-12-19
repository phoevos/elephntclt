const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const mongoose = require('mongoose');

let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("ResolutionCode.csv");
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
            ResolutionCodeText: data[3],
            ResolutionCodeNote: data[4]
        });
    })
    .on("end", function () {
        // remove the first line: header
        // csvData.shift();

        // console.log(csvData);

        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("energy")
                    .collection("ResolutionCode")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });

stream.pipe(csvStream);