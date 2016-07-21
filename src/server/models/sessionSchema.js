var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
  sessionId: { type: String },
  browser: { type: String },
  vh: { type: Number },
  vw: { type: Number },
  platform: { type: String },
  entryState: { type: String },
  clicks: { type: Array }
});

sessionSchema.plugin(timestamps);

module.exports = sessionSchema;
