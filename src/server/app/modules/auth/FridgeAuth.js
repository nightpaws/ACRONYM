/**
 * Created by Tom on 14/11/2015.
 */

var q = require('q');
var deferred = q.defer();
var JWT = require('./JWT');
var mongoose = require('mongoose');
var config = require('../../../config');


var Auth = {

	registerFridge: function(fridge_no){

		var fridgeModel = require('../../models/Fridge.model.js').fridge;

		deferred = q.defer();

		var fridge = new fridgeModel({

			fridge_no: fridge_no,
			contents: [],
			states: [],
			name: fridge_no,
			description: ''

		});

		fridge.save(function(err, doc){

			if(err){
				deferred.reject('Error registering fridge');
			}else{
				deferred.resolve({
                    fridge_id: doc._id,
                    token: JWT.generateAuth({fridge_id: doc._id, fridge_no: doc.fridge_no, type:'fridge'})
                });
			}

		});

		return deferred.promise;
	}

};

module.exports = Auth;
