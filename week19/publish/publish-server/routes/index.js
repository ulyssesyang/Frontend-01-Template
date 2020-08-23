var express = require('express');
var router = express.Router();
var fs = require('fs');
var unzip = require('unzipper');

router.post('/', function(req, res, next) {
  let writeStream = unzip.Extract({path: '../server/public'});

  req.on('data', (data) => {
    writeStream.write(data)
  });

  req.on('end', (data) => {
    writeStream.end(data);
  });

  res.end('ok')
});

module.exports = router;
