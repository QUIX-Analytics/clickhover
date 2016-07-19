'use strict';
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./config/config.js');

//App
var app = express();
app.use("/node_modules", express.static(__dirname + "./../../node_modules"));
app.use("/", express.static(__dirname + "./../client"));
app.use("/dist", express.static(__dirname + "./../../dist"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Variables
var port = process.env.PORT || 3000;

//Database
// mongoose.set('debug', true);
mongoose.connect(config.mongoURI, function (err, res) {
	if (err) console.log('Error connecting to database')
	else console.log('QUIX database now connected!')
});

//Endpoints


//Listen
app.listen(port, function() {
  console.log('QUIX Express server listening on ' + port);
})
