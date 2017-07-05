'use strict';

const express = require('express');
const mongodb = require('mongodb');
const path = require('path');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(path.join(__dirname, '/node_modules/angular/')));

const main = require('./controllers/main.js');
app.use('/', main);

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);

const MongoClient = require('mongodb').MongoClient;
// Initialize connection once
var conn = new Promise(function(resolve, reject){
    const db = MongoClient.connect("mongodb://afs-mongo:27017/integration_test", function(err, database) {
    if(err) return reject(err);
    // Start the application after the database connection is ready
    console.log("Returning DB connection ", database.databaseName);
    return resolve(database);
    });  
});
module.exports = conn;
