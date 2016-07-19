var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var siteSchema = new Schema({ any: Schema.Types.Mixed });

module.exports = mongoose.model("Site", siteSchema);
