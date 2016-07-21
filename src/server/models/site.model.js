var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var siteSchema = new Schema({
  QXID: { type: Number, required: true, unique: true },
  baseURL: { type: String },
  // sessions: { type: Array }
  
});

siteSchema.plugin(timestamps);

module.exports = mongoose.model("Site", siteSchema);
