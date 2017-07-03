'use strict';

const express = require('express');
var mongodb = require('mongodb');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


var MongoClient = require('mongodb').MongoClient;
var db;
// Initialize connection once
MongoClient.connect("mongodb://afs-mongo:27017/integration_test", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(PORT, HOST);
  console.log('Running on http://' + HOST + ':' + PORT);
});



// App
const app = express();
app.get('/', function (req, res) {
  
  db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
  docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
        res.send(doc);
      }
      else {
        res.send("Nothing found in DB");
      }
    });
   });



});

app.get('/test', function (req, res) {
  res.send('My Test Message\n');
});

// app.listen(PORT, HOST);
// console.log('Running on http://' + HOST + ':' + PORT);