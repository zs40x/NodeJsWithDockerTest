var PORT = 8000;

var database = require("./database");
var entryRepository = require("./repositories/entryRepository");
entryRepository.init(database);

var entryModel = require("./entryModel");
entryRepository.allEntries(function (err, entries) {
    if(entries) {
      entries.forEach(function (item) {
        entryModel.append(item.entry);
      });
    }
});

var express = require('express');
var expressHandlebars  = require('express-handlebars');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.engine('html', expressHandlebars());
app.set('view engine', 'html');
app.set('views', __dirname);

var controllers = require("./controllers");
controllers.init(app, database, entryModel);

var http = require('http');
http.Server(app).listen(PORT, function() {
  console.log("HTTP server listening on port %s", PORT);
});