var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	username: {
		type: String,
		index: true
	},
	admin: {
		type: Boolean,
		default: false
	},
	sites: [{type: Schema.Types.ObjectId, ref: 'Site'}]
});

userSchema.plugin(timestamps);

module.exports = mongoose.model("User", userSchema);
