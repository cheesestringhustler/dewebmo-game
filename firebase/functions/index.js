const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp({
  storageBucket: functions.config().firebase.storageBucket,
  databaseURL: functions.config().firebase.databaseURL
});

const app = express();
app.use(cors({ origin: true }));

const scoreFileStr = "hslu/dewebmo/scores.json";

var highscores = [];

app.get("/getScores", function (req, res) {
    
    loadScores().then(() => {
        highscores.sort((a, b) => (b.score - a.score));

        res.json(highscores);
    }).catch(err => {
        res.setStatus(500);
        res.send("error " + err.message);
    });
});

app.post("/writeScore", function (req, res) {
    const body = req.body;
    if (body["score"] !== undefined && body["score"] !== "" &&
      body["name"] !== undefined && body["name"] !== "") {

        loadScores().then(() => {
            let p = { name: body["name"], score: parseInt(body["score"]) };
            highscores.push(p);
            
            const file = admin.storage().bucket().file(scoreFileStr); //https://medium.com/analytics-vidhya/how-to-write-and-get-a-json-file-in-google-cloud-storage-when-deploying-flask-api-in-google-app-9121fa936d85
            file.save(JSON.stringify(highscores))
                .then(() => { 
                    res.sendStatus(200);
                });
        }).catch(err => {
            res.status(500);
            res.send("error: " + err.message);
        });
      
    } else {
      res.status(500);
      res.send("something missing");
    }
  });

function loadScores() {
    return new Promise((resolve, reject) => {
        admin.storage().bucket().file(scoreFileStr)
            .download(function (err, contents) {
                if (!err) {
                    var jsObject = JSON.parse(contents.toString('utf8'));
                    highscores = jsObject;
                    resolve();
                } else {
                    reject(err);
                }
        });
    });
}

exports.HSLU_DEWEBMO_Highscores = functions.https.onRequest(app);