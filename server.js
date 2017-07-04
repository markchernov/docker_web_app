'use strict';

const express = require('express');
const mongodb = require('mongodb');
const path = require('path');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(path.join(__dirname, '/node_modules/angular/')));

// test assets from public
app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + '../public/index.html'));
});


// test DB
app.get('/db', function (req, res) {
  
  db.collection("test_objects").find({}, function(err, docs) {
  const response = [];  
  docs.each(function(err, doc) {
      if(err) {
        throw Error("Error processing DB results")
      }
      if(doc) {
        console.log("Next element ", doc);
        response.push(doc);
      } 
      else {
        res.send(response);
      }
    });
   });
});

app.get('/test', function (req, res) {
  res.send('My Test Message\n');
});

