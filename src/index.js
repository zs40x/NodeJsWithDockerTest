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
  res.sendStatus(201);
});

http.Server(app).listen(PORT, function() {
  console.log("HTTP server listening on port %s", PORT);
});