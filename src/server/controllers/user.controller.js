var User = require('../models/user.model');
var passport = require('./../services/passport');

module.exports = {

	login: function(req, res, next) {
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
	},

  register: function(req, res, next) {
    User.create(req.body, function(err, result) {
      if(err) return res.status(500).send(err);
      newUser = result.toObject();
      newUser.password = null;
      res.status(200).json(newUser);
    });
  },

  read: function(req, res, next) {
    User.find(req.query, function(err, result) {
      if (err) return res.status(500).send(err);
      for (var i = 0; i < result.length; i++) {
        delete result[i].password;
      }
      res.status(200).send(result);
    });
  },

  me: function(req, res, next) {
    if (!req.user) return res.send('current user not defined');
    req.user.password = null;
    return res.status(200).json(req.user);
  },

  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user) {
      if (err) next(err);
      res.status(200).send(user);
    });
  },

	delete: function(req, res, next) {
		User.findByIdAndRemove(req.params.id, function(err, user) {
			if (err) next(err);
			res.status(200).send(user);
		});
	},

	logout: function(req, res, next) {
	  req.logout();
	  return res.status(200).send('logged out');
	}
};
