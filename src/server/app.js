'use strict';


/*------------------------------------*\
  #DEPENDENCIES
\*------------------------------------*/

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./config/config');
var userCtrl = require('./controllers/user.controller');
var passport = require('./services/passport');





/*------------------------------------*\
  #VARIABLES
\*------------------------------------*/

var port = config.PORT;





/*------------------------------------*\
  #APP
\*------------------------------------*/

var app = express();
app.use("/node_modules", express.static(__dirname + "./../../node_modules"));
app.use("/node_modules", express.static(__dirname + "./../../node_modules"));
app.use("/", express.static(__dirname + "./../client"));
app.use("/dist", express.static(__dirname + "./../dist"));
app.use("/assets", express.static(__dirname + "./../assets"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());





/*------------------------------------*\
  #AUTH SETUP
\*------------------------------------*/

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





/*------------------------------------*\
  #DATABASE
\*------------------------------------*/

mongoose.set('debug', true);
mongoose.connect(config.mongoURI, function (err, res) {
	if (err) console.log('Error connecting to database')
	else console.log('QUIX database now connected!')
});





/*------------------------------------*\
  #SITE ENDPOINTS
\*------------------------------------*/

var siteCtrl = require('./controllers/site.controller.js');

app.get('/api/site', siteCtrl.getSite);
app.get('/api/site/:id', siteCtrl.mySite);
app.post('/api/site', siteCtrl.createSite);
app.patch('/api/site/:id', siteCtrl.addClick);




var User = require('./models/user.model.js');

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
	});
});





/*------------------------------------*\
  #USER ENDPOINTS
\*------------------------------------*/

app.post('/auth/register', userCtrl.register);
app.get('/auth/me', userCtrl.me);
app.get('/auth', userCtrl.read);
app.put('/auth/:id', isAuthed, userCtrl.update);
app.post('/auth/login', userCtrl.login);
app.get('/auth/logout', userCtrl.logout);
app.delete('/auth/:id', userCtrl.delete)





/*------------------------------------*\
  #ENABLE HTML MODEL
\*------------------------------------*/

app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', {root: './src/client/'});
});





/*------------------------------------*\
  #LISTEN
\*------------------------------------*/

app.listen(port, function () {
	console.log('QUIX Express server listening on ' + port);
});
