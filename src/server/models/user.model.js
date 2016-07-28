var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;
var ShortId = require('mongoose-shortid-nodeps');

var userSchema = new Schema({
	_id: {
    type: ShortId,
		len: 7,
		alphabet: '0123456789'
	},
	username: {
		type: String,
		unique: true,
		index: true,
		required: true,
		validate: {
			validator: validateLength,
			message: 'Your username needs to be 4-20 characters long.'
		}
	},
	email: {
		type: String,
		unique: true,
		index: true,
		required: true,
		validate: {
			validator: validateEmail,
			message: 'Not a valid email address'
		}
	},
	password: {
		type: String,
		required: true
	},
	sites: [{type: String, ref: 'Site'}]
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

userSchema
	.virtual('userInfo')
	.get(function() {
		return {
			'_id' : this._id,
			'username' : this.username,
			'email' : this.email,
			'sites' : this.sites
		}
	});

userSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

////////////////////////////////////

function validateLength(v) {
	if(v.length >= 4 && v.length <= 20) {
		return true;
	}
	return false;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = mongoose.model("User", userSchema);
