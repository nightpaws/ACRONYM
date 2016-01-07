/**
 * Created by Tom on 14/11/2015.
 */

var mongoose = require('mongoose');
var config = require('../../config');

var product = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
		unique: true
	},
	code:{
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		default: 'Unnamed Product'
	},
	description:{
		type: String,
		default: '-'
	},
	weight: Number
});

product.index({ name: 'text', description: 'text'});

module.exports = mongoose.model('Product', product);