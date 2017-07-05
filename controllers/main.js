const express = require('express');
const router = express.Router();
const conn = require('../server.js');
console.log("conn ", conn);

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
  const db = conn.then(function(result) { return result});  
  console.log('DB object ', db);
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