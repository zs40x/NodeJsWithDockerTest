var express = require('express');
var expressHandlebars  = require('express-handlebars');
var bodyParser = require('body-parser')
var http = require('http');

var PORT = 8000;

var app = express();
app.use(bodyParser.json());
app.engine('html', expressHandlebars());
app.set('view engine', 'html');
app.set('views', __dirname);

var entryModel = require("./entryModel");

var database = require("./database");
database.getDb(function (err, db) {
  if(!err) {
    db.entries.find({}).each(function (err, doc) {
      if(doc) entryModel.append(doc.entry);
    });
  }
});

var controllers = require("./controllers");
controllers.init(app, database, entryModel);

http.Server(app).listen(PORT, function() {
  console.log("HTTP server listening on port %s", PORT);
});