// server.js
'use strict'

// dependencies:
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// create instances:
var app = express();
var router = express.Router();

// set port:
var port = process.env.API_PORT || 3001;

// config API, use bodyParser, look for JSON in req.body:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow CORS:
app.use(function(req,res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );

  // remove caching to get most recent data:
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// set route path and initialize API:
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized.' });
});

// use router config when we call /api:
app.use('/api', router);

// start server:
app.listen(port, function() {
  console.log(`API running on port ${port}`);
});
