const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const mongoose = require('mongoose');

let gap12 = '            '

let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream("AllocatedEICDetail.csv");
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
            MRID: data[3],
            DocStatusValue: data[4],
            AttributeInstanceComponent: data[5],
            LongNames: data[6],
            DisplayNames: data[7],
            LastRequestDateAndOrTime: data[8],
            DeactivateRequestDateAndOrTime: data[9],
            MarketParticipantStreetAddressCountry: data[10],
            MarketParticipantACERCode: data[11],
            MarketParticipantVATCode: data[12],
            Description: data[13],
            EICParentMarketDocumentMRID: data[14],
            ELCResponsibleMarketParticipantMRID: data[15],
            IsDeleted: data[16],
            Ignore: data[17]
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
                    .collection("AreaCode")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });

stream.pipe(csvStream);