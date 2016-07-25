var User = require('./../models/user.model.js');
var passport = require('./../services/passport.js');

module.exports = {
	login: login,
	register: register,
	read: read,
	me: me,
	update: update,
	logout: logout
};

function login(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			return res.send('Unauthorized');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.send('Logged In');
		});
	})(req, res, next);
}

function register(req, res, next) {
	var that = this;
	User.create(req.body, function(err, result) {
		if(err) return res.status(409).send(err);
		var newUser = result.toObject();
		// newUser.password = null;
		req.user = newUser;
		login(req, res, next);
	});
}

function read(req, res, next) {
	User.find(req.query, function(err, result) {
		if (err) return res.status(500).send(err);
		for (var i = 0; i < result.length; i++) {
			delete result[i].password;
		}
		res.status(200).send(result);
	});
}

function me(req, res, next) {
	if (!req.user) return res.send('current user not defined');
	req.user.password = null;
	return res.status(200).json(req.user);
}

function update(req, res, next) {
	User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user) {
		if (err) next(err);
		res.status(200).send(user);
	});
}

function logout(req, res, next) {
	req.logout();
	return res.status(200).send('logged out');
}
