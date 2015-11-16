/**
 * Created by Tom on 14/11/2015.
 */

var mongoose = require('mongoose');
var config = require('../../config');

var content = new mongoose.Schema({
	Product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products',
		required: true
	},
	current_weight:{
		type: Number,
		required :true
	},
	date_added:{
		type: Date,
		required: true,
		default: Date.now()
	}
});

var state = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
	temperature:{
		type: Number,
		required: true
	},
	door:{
		type: Boolean,
		required: true
	},
	weight:{
		type: Number,
		required: true
	}
});

var fridge = new mongoose.Schema({
	fridge_no: {
		type : Number,
		required: true,
		unique: true
	},
	contents: [
		content
	],
	states: [
		state
	],
	createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = {
	fridge: mongoose.model('fridge', fridge),
	states: mongoose.model('state', state),
	contents: mongoose.model('content', content)
};