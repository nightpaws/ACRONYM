/**
 * Created by Tom on 12/11/2015.
 */

var mongoose = require('mongoose');
var config = require('../../config');


var user = new mongoose.Schema({
	username: {
		type : String,
		required: true,
		unique: true
	},
	email: {
		type : String,
		required: true,
		unique: true
	},
	passphrase: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', user);
