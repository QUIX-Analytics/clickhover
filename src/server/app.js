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
app.use("/dist", express.static(__dirname + "./../dist"));
app.use("/assets", express.static(__dirname + "./../assets"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Variables
var port = process.env.PORT || 3000;

//Database
mongoose.set('debug', true);
mongoose.connect(config.localmongoURI, function (err, res) {
	if (err) console.log('Error connecting to database')
	else console.log('QUIX database now connected!')
});

//Endpoints
var Site = require('./models/site.model.js');
var User = require('./models/user.model.js');

app.get('/api/site', function (req, res, next) {
	console.log('API read Site');
	Site.find(req.query)
		.exec(function (err, site) {
			if (err) res.status(500).send(err);
			res.status(200).send(site);
		});
	// Site.find(req.query, function(err, site) {
	//   if (err) res.status(500).send(err);
	//   res.status(200).send(site);
	// })
});
app.post('/api/site', function (req, res, next) {
	console.log('API create Site', req.body);
	Site.create(req.body, function (err, site) {
		if (err) res.status(500).send(err);
		res.status(200).send(site);
	})
});
app.patch('/api/site/:id', function(req, res, next){
	console.log('API add click to site of id', req.params.id);
	Site.findByIdAndUpdate(req.params.id, {}, function(err, site){
		if(err) res.status(500).send(err);
		var sessionToUpdate = {};
		var sessionExists = false;
		for(var i = 0; i < site.sessions.length; i++){
			if(site.sessions[i].sessionId === req.body.sessionId){
				sessionExists = true;
				sessionToUpdate = site.sessions[i];
			}
		}
		if(sessionExists){
			sessionToUpdate.clicks.push(req.body.click);
			site.markModified('sessions');
			site.save(function(err, s){
				if (err) res.status(500).send(err);
				res.status(200).send(s);
			})
		} else {
			site.sessions.push({
				"sessionId": req.body.sessionId,
				"clicks": [req.body.click]
			});
			site.save(function(err, s){
				if (err) res.status(500).send(err);
				res.status(200).send(s);
			})
		}
	})

})

app.get('/api/user', function (req, res, next) {
	console.log('read', req.body);
	User.find(req.query, function (err, user) {
		if (err) res.status(500).send(err);
		res.status(200).send(user);
	})
});
app.get('/api/user/:id', function (req, res, next) {
	console.log('show', req.body);
	User.findOne({
		_id: req.params.id
	}, function (e, r) {
		if (e) {
			return res.status(500).send(e);
		}
		return res.status(200).json(r);
	})
});
app.put('/api/user/:id', function (req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
		if (err) res.status(500).send(err);
		res.status(200).send(user);
	});
});
app.post('/api/user', function (req, res, next) {
	console.log('create user', req.body);
	User.create(req.body, function (err, user) {
		if (err) return res.status(500).send(err);
		res.status(200).json(user);
	})
});
app.delete('/api/user/:id', function (req, res, next) {
	User.findByIdAndRemove(req.params.id, function (err, user) {
		if (err) res.status(500).send(err);
		res.status(200).send(user);
	})
});

//Listen
app.listen(port, function () {
	console.log('QUIX Express server listening on ' + port);
});
