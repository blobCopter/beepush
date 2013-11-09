/**
 * User
 *
 * @module      :: Model
 * @description :: The User model
 *
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

////////////////////////////////
/// SCHEMA
////////////////////////////////
attributes:
{
	username: {
		type: 'string',
		maxLength: 42,
		minLength: 3
	},
	email: {
		type: 'email', // Email type will get validated by the ORM
		required: true
	},
	provider: {
		type: 'string',
		defaultsTo: 'local'
	},
	permission: {
		type: 'string',
		defaultsTo: 'user' // uers, moderator, admin
	},
	password: {
		type: 'string',
		required: true
	},
},


////////////////////////////////
/// METHODS
////////////////////////////////
	toJSON: function() {
		var obj = this.toObject();
		delete obj.password;
		return obj;
	},

	beforeCreate: function(user, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err)
				cb(err);
			bcrypt.hash(user.password, salt, null, function(err, hash) {
				if (err) {
				  console.log(err);
				  cb(err);
				}else{
				  user.password = hash;
				  cb(null, user);
				}
			});
		});
	}
};
