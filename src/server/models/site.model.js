var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var session = require('./sessionSchema');
// var ObjectId = Schema.ObjectId;
var shortid = require('shortid');

var siteSchema = new Schema({
  // qxid: { type: String, required: true },
  _id: { type: String, default: shortid.generate },
  URL: { type: String },
  sessions: [session]
});

siteSchema.plugin(timestamps);

module.exports = mongoose.model("Site", siteSchema);
