'use strict';

var express = require('express');
var Realm = require('realm');
var app = express();

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  // TODO:
  let databases = [];
  res.render('pages/index', {databases: databases});
});

app.listen(3000, function() {
  console.log("Go!");
});

app.get('/add_db', function(req, res) {
  // TODO:
  let owners = [];
  res.render('pages/add_db', {owners: owners});
});

app.get('/add_owner', function(req, res) {
  res.render('pages/add_owner');
});

app.get('/owners', function(req, res) {
  // TODO:
  let owners = [];
  res.render('pages/owners', {owners: owners});
});

let DBSchema = {
  name: 'DB',
  primaryKey: "name",
  properties: {
    timestamp: 'date',
    name: 'string',
    rating: 'string'
    // TODO:
    // owner: 
  }
};

let OwnerSchema = {
  name: 'Owner',
  primaryKey: "name",
  properties: {
    name: 'string',
    website: 'string'
    // TODO:
    // databases: 
  }
};

var realm = new Realm({
  path: 'ranking.realm',
  schema: [DBSchema, OwnerSchema]
})

app.post('/add_db', function(req, res) {
  // TODO
  // add database
  res.redirect('/');
});


app.post('/add_owner', function(req, res) {
  // TODO
  // add owner
  res.redirect('/');
});