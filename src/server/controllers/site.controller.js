var Site = require('../models/site.model.js');
var User = require('../models/user.model.js');
var ClickSession = require('../models/sessionSchema.js');
var mongoose = require('mongoose');
var ShortId = require('mongoose-shortid-nodeps');


module.exports = {
	getSite: function (req, res, next) {
		// console.log('API read Site');
		Site.find(req.query)
			.exec(function (err, site) {
				if (err) res.status(500).send(err);
				res.status(200).send(site);
			});
	},

	mySite: function (req, res, next) {
		// console.log('GET My Site');
		Site.findById(req.params.id)
			.exec(function (err, site) {
				if (err) res.status(500).send(err);
				res.status(200).send(site);
			});
	},

	createSite: function (req, res, next) {
		// console.log('API create Site', req.body);
		var newSite = new Site(req.body);
		newSite.save(function (err, s) {
			// console.log(s);
			if (err) return res.status(500).json(err);
			User.findByIdAndUpdate(
				req.user._id, {
					$push: {
						"sites": {
							_id: s._id
						}
					}
				}, {
					safe: true,
					upsert: true,
					new: true
				},
				function (err, model) {
					console.log(err);
				}
			);
			return res.json(s);
		})
	},

	delete: function (req, res, next) {
		// console.log("site Control delete")
		return Site.findByIdAndRemove(req.params.id, function (err, site) {
			console.log(site)
				if (!err) {
					User.findByIdAndUpdate(req.user._id, {$pull: {"sites": site._id}}, function (err, num) {
						// console.log(req.user._id)
						console.log(num)
					})
					res.status(200).json(site);
				} else {
					console.log(err);
				};

		});
	},

	addClick: function (req, res, next) {
		// console.log('API add click to site of id', req.params.id);
		Site.findById(req.params.id, function (err, site) {
			if (err) res.status(500).send(err);
			if (!site) {
				res.status(400).send('No site exists with this qxid');
			} else {
				var sessionToUpdate = {};
				var sessionExists = false;
				if (req.body.sessionId && site) {
					var sessionToUpdate = site.sessions.id(req.body.sessionId)
					sessionToUpdate.clicks.push(req.body.click);
					site.markModified('sessions');
					site.save(function (err, s) {
						if (err) res.status(500).send(err);
						res.status(200).send(s);
					})
				} else {
					var newSession = req.body;
					site.sessions.push(newSession);
					site.markModified('sessions');
					site.save(function (err, s) {
						if (err) res.status(500).send(err);
						res.status(200).send(s);
					})
				}
			}
		})
	}

}
