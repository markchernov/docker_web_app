const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const connecting = new Promise(function(resolve, reject){
            console.log(new Date(), ' Connecting to Db '); 
            MongoClient.connect("mongodb://afs-mongo:27017/integration_test", function(err, database) {
                if (err)  {
                    reject(err)
                } else {                
                    console.log(new Date(), " Calling resolve with DB connection ", database.databaseName);
                    resolve(database);
                }
            });  
    });

var db;

console.log(new Date()," Connecting in main.js", connecting);
connecting
 .then(function(connection) {
    console.log(new Date(), ' Connected to ', connection.databaseName);  
    db =  connection })
 .catch(function(err) {
	  console.log(err);
});  

router.use(function timeLog (req, res, next) {
  console.log(req.url, ' Time: ', new Date());
  next();
})

// test assets from public
router.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + '../public/index.html'));
});


// test DB
router.get('/db', function (req, res) {
  console.log(new Date(), ' db  in /db ', db.databaseName);
  db.collection("test_objects").find({}, function(err, docs) {
  const response = [];  
  docs.each(function(err, doc) {
      if(err) {
        throw Error("Error processing DB results");
      }
      if(doc) {
        console.log(new Date(), "Next element ", doc);
        response.push(doc);
      } 
      else {
        res.send(response);
      }
    });
  });
});

router.get('/test', function (req, res) {
  res.send('My Test Message\n');
});

module.exports = router;