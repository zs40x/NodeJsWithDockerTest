var express = require('express');
var expressHandlebars  = require('express-handlebars');
var bodyParser = require('body-parser')

var http = require('http');

var PORT = 8000;

var LINES = [
  "Hey, now, you're an All Star, get your game on, go play",
  "Hey, now, you're a Rock Star, get the show on, get paid",
  "And all that glitters is gold",
  "Only shooting stars break the mold",
];

var lineIndex = 0;

var database = require("./database");

var app = express();
app.use(bodyParser.json());

app.engine('html', expressHandlebars());
app.set('view engine', 'html');
app.set('views', __dirname);
app.get('/', function(req, res) {
  var message = LINES[lineIndex];

  lineIndex += 1;
  if (lineIndex > LINES.length) {
      lineIndex = 0;
  }

  res.render('index', {message: message});
});
app.post('/entry', function(req, res) {
  if (!req.body) return res.sendStatus(400)
  LINES.push(req.body.entry);

  database.getDb(function (err, db) {
    if(err) {
      res.status(500).json(err);
      return;
    }

    var record ={
      entry: req.body.entry,
      created: Date()
    };

    db.entries.insertOne(record, function (err, r) {
      if(err) {
        res.status(500).json({
          status: "Internal server error",
          error: err
        });
        return;
      }

      res.status(201).json(req.body);
    });
  }); 
});

http.Server(app).listen(PORT, function() {
  console.log("HTTP server listening on port %s", PORT);
});