var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({ any: {} });

siteSchema.plugin(timestamps);

module.exports = mongoose.model("Session", sessionSchema);
