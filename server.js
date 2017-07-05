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
console.log(new Date(),' Running on http://' + HOST + ':' + PORT);


     