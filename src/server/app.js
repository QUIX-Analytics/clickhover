'use strict';
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./config/config');
var userCtrl = require('./controllers/user.controller');
var passport = require('./services/passport');

//App
var app = express();
app.use("/node_modules", express.static(__dirname + "./../../node_modules"));
app.use("/", express.static(__dirname + "./../client"));
app.use("/dist", express.static(__dirname + "./../../dist"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Auth Setup
var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) return res.status(401).send();
    return next();
}

app.use(session({
	secret: config.secret,
	saveIninitialized: false,
	resave: false
}))

app.use(passport.initialize())
app.use(passport.session())


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

// Auth Endpoints
app.post('/register', userCtrl.register);
app.get('/me', userCtrl.me);
// app.get('/user', userCtrl.read);
// app.put('/user/:id', userCtrl.update);
app.post('/login', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
    req.logout();
    return res.status(200).send('logged out');
})

//Listen
app.listen(port, function () {
	console.log('QUIX Express server listening on ' + port);
});
