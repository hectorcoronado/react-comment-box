// server.js
'use strict'

// dependencies:
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();

var Comment = require('./model/comments');

// create instances:
var app = express();
var router = express.Router();

// set port:
var port = process.env.API_PORT || 3001;

// config db:
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds133251.mlab.com:33251/react-comment-box`);

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
  res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Comment();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });


// use router config when we call /api:
app.use('/api', router);

// start server:
app.listen(port, function() {
  console.log(`API running on port ${port}`);
});
