// model/comments.js
'use strict';

// dependencies:
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create instance of mongoose.schema:
var CommentsSchema = new Schema({
  author: String,
  text: String
});

module.exports = mongoose.model('Comment', CommentsSchema);
