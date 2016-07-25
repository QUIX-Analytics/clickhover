var Site = require('../models/site.model.js');
var ClickSession = require('../models/sessionSchema.js');
var mongoose = require('mongoose');


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
    console.log('My Site');
  	Site.findById(req.params.id)
  		.exec(function (err, site) {
  			if (err) res.status(500).send(err);
  			res.status(200).send(site);
  		});
  },

  createSite: function(req, res, next){
    console.log('API create Site', req.body);
  	// Site.create(req.body, function (err, site) {
    //   site._id = req.body.qxid;
  	// 	if (err) res.status(500).send(err);
  	// 	res.status(200).send(site);
  	// })
    var newSite = new Site(req.body);
    newSite.save(function(err,s){
      if(err) return res.status(500).json(err);
      
      return res.json(s);
    })
  },

  addClick: function(req, res, next){
    console.log('API add click to site of id', req.params.id);
    Site.findById(req.params.id, function(err, site){
      if(err) res.status(500).send(err);
      var sessionToUpdate = {};
      var sessionExists = false;
      for(var i = 0; i < site.sessions.length; i++){
        if(site.sessions[i].sessionId == req.body.sessionId){
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
