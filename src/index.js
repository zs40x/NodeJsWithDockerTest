const PORT = 8000;

var database = require("./database");
require("./repositories/entryRepository");
var entryRepository = new EntryRepository(database);

var entryModel = require("./entryModel");
entryModel.init(entryRepository);

var express = require('express');
var expressHandlebars  = require('express-handlebars');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.engine('html', expressHandlebars());
app.set('view engine', 'html');
app.set('views', __dirname);

var controllers = require("./controllers");
controllers.init(app, entryModel, entryRepository);

var http = require('http');
http.Server(app).listen(PORT, function() {
  console.log("HTTP server listening on port %s", PORT);
});