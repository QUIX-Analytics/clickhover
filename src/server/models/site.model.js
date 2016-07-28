var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var session = require('./sessionSchema');
var ShortId = require('mongoose-shortid-nodeps');
// var ObjectId = Schema.ObjectId;

var siteSchema = new Schema({
  // qxid: { type: String, required: true },
  _id: {
    type: ShortId,
    len: 7,
    alphabet: '0123456789'
  },
  URL: {
    type: String,
    unique: true,
    index: true,
    required: true },
  sessions: [session]
});

siteSchema.plugin(timestamps);

module.exports = mongoose.model("Site", siteSchema);
