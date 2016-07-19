var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var bcrypt = require('bcryptjs');
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
	email: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	sites: [{type: Schema.Types.ObjectId, ref: 'Site'}]
});

userSchema.plugin(timestamps);

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password'))    return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

userSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
