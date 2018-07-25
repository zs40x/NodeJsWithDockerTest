var express = require('express');
var expressHandlebars  = require('express-handlebars');
var bodyParser = require('body-parser')

var http = require('http');

var PORT = 8000;

var database = require("./database");

var app = express();
app.use(bodyParser.json());


var controllers = require("./controllers");
controllers.init(app);

app.engine('html', expressHandlebars());
app.set('view engine', 'html');
app.set('views', __dirname);


app.get("/entry", function(req,res) {
  database.getDb(function (err, db) {
    if(err) {
      res.status(500).json(err);
      return;
    }

    db.entries.find({}).toArray(function (err, docs) {
      if(err) {
        res.status(500).json(err);
        return;
      }

      res.status(200).json(docs);
    });
  });
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