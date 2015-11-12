/**
 * Created by Tom on 12/11/2015.
 */

var mongoose = require('mongoose');
var config = require('../../config');
mongoose.connect(config.mongoDB.string);

var user = new mongoose.Schema({
	username: {
		type : String,
		unique: true
	},
	email: {
		type : String,
		unique: true
	},
	passphrase: String,
	createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('user', user);
