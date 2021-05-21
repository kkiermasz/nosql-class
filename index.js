'use strict';

var express = require('express');
var Realm = require('realm');
var app = express();

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  let databases = realm.objects('DB').sorted('name', true);
  res.render('pages/index', {databases: databases});
});

app.listen(3000, function() {
  console.log("Go!");
});

app.get('/add_db', function(req, res) {
  let owners = realm.objects('Owner').sorted('name', true);
  res.render('pages/add_db', {owners: owners});
});

app.get('/add_owner', function(req, res) {
  res.render('pages/add_owner');
});

app.get('/owners', function(req, res) {
  let owners = realm.objects('Owner').sorted('name', true);
  res.render('pages/owners', {owners: owners});
});

let DBSchema = {
  name: 'DB',
  primaryKey: "name",
  properties: {
    timestamp: 'date',
    name: 'string',
    rating: 'string',
    owner: {
      type: 'linkingObjects',
      objectType: 'Owner',
      property: 'databases'
    }
  }
};

let OwnerSchema = {
  name: 'Owner',
  primaryKey: "name",
  properties: {
    name: 'string',
    website: 'string',
    databases: "DB[]"
  }
};

var realm = new Realm({
  path: 'ranking.realm',
  schema: [DBSchema, OwnerSchema]
})

app.post('/add_db', function(req, res) {
  let name = req.body['name'],
    rating = req.body['rating'],
    ownerName = req.body['owner'],
    timestamp = new Date();

    realm.write(() => {
      const database = realm.create('DB', {name: name, rating: rating, timestamp: timestamp});
      const ownerObject = realm.objectForPrimaryKey("Owner", ownerName);
      ownerObject.databases.push(database);
  });
  res.redirect('/');
});


app.post('/add_owner', function(req, res) {
  let name = req.body['name'],
    url = req.body['url'];
    realm.write(() => {
      realm.create('Owner', {name: name, website: url, databases: []});
  });
  res.redirect('/');
});