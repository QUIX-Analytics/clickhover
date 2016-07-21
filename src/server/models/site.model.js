var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var session = require('./sessionSchema');
// var ObjectId = Schema.ObjectId;

var siteSchema = new Schema({
  qxid: { type: String, required: true },
  URL: { type: String },
  sessions: [session]
});

siteSchema.plugin(timestamps);

module.exports = mongoose.model("Site", siteSchema);
