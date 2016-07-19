var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	quixid: Number,
	username: {
		type: String,
		index: true
	},
	created: {
		type: Date,
		default: new Date()
	},
	admin: {
		type: Boolean,
		default: false
	},
	sites: [{type: Schema.Types.ObjectId, ref: 'Site'}]
});

module.exports = mongoose.model("User", userSchema);
