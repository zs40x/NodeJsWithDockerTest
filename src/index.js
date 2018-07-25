var express = require('express');
var expressHandlebars  = require('express-handlebars');
var bodyParser = require('body-parser')

var http = require('http');

var PORT = 8000;

var database = require("./database");
var app = express();
app.use(bodyParser.json());

var entryModel = require("./entryModel");

var controllers = require("./controllers");
controllers.init(app, database, entryModel);

app.engine('html', expressHandlebars());
app.set('view engine', 'html');
app.set('views', __dirname);


http.Server(app).listen(PORT, function() {
  console.log("HTTP server listening on port %s", PORT);
});