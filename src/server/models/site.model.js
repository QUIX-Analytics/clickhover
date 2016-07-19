var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var siteSchema = new Schema({ any: Schema.Types.Mixed });

siteSchema.plugin(timestamps);

module.exports = mongoose.model("Site", siteSchema);
