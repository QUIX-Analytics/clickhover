'use strict';
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');

//App
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Variables
var port = process.env.PORT || 3000;
var mongoURI = 'mongodb://localhost/quix';

//Endpoints


//Listen
app.listen(port, function() {
  console.log('QUIX Express server listening on ' + port);
})
