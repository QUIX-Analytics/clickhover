var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var sessionSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  browser: { type: String },
  vh: { type: Number },
  vw: { type: Number },
  platform: { type: String },
  entryState: { type: String },
  qu: { type: String }, //Persistent user ID that tracks a user across multiple sessions
  clicks: { type: Array }
});

sessionSchema.plugin(timestamps);

module.exports = sessionSchema;
