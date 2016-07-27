var Site = require('../models/site.model.js');
var User = require('../models/user.model.js');
var ClickSession = require('../models/sessionSchema.js');
var mongoose = require('mongoose');
var ShortId = require('mongoose-shortid-nodeps');


module.exports = {
  getSite: function(req, res, next){
    console.log('API read Site');
  	Site.find(req.query)
  		.exec(function (err, site) {
  			if (err) res.status(500).send(err);
  			res.status(200).send(site);
  		});
  },

  mySite: function(req, res, next){
    console.log('GET My Site');
  	Site.findById(req.params.id)
  		.exec(function (err, site) {
  			if (err) res.status(500).send(err);
  			res.status(200).send(site);
  		});
  },

  createSite: function(req, res, next){
    console.log('API create Site', req.body);
    var newSite = new Site(req.body);
    newSite.save(function(err,s){
      if(err) return res.status(500).json(err);
      // User.findByIdandUpdate(req.user._id, newData, {upsert:true}, function(err, response) {
      //   if(err) return res.status(500).send(err);})
      return res.json(s);
    })
  },

  addClick: function(req, res, next){
    console.log('API add click to site of id', req.params.id);
    Site.findById(req.params.id, function(err, site){
      if(err) res.status(500).send(err);
      console.log(site);
      var sessionToUpdate = {};
      var sessionExists = false;
      if(req.body.sessionId){
        console.log('1');
        var sessionToUpdate = site.sessions.id(req.body.sessionId)
        sessionToUpdate.clicks.push(req.body.click);
        site.markModified('sessions');
          site.save(function(err, s){
            if (err) res.status(500).send(err);
            res.status(200).send(s);
          })
      } else {
        console.log('2');
          var newSession = req.body;
          site.sessions.push(newSession);
          site.markModified('sessions');
          site.save(function(err, s){
            if (err) res.status(500).send(err);
            res.status(200).send(s);
          })
      }
    })
  }

}
