'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.send("Hello Realm");
});

app.listen(3000, function() {
  console.log("Go!");
});

app.get('/add', function(req, res) {
  res.sendFile(__dirname + "/add.html");
});

app.post('/add', function(req, res) {
  res.send(req.body);
});