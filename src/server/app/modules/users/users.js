/**
 * Created by Tom on 28/12/2015.
 */

var q = require('q');
var deferred = q.defer();
var mongoose = require('mongoose');
var config = require('../../../config');

var users = {

	listenToFridge: function(fridge_id, user){

		var fridgeModel = require('../../models/Fridge.model').fridge;

		deferred = q.defer();

		fridgeModel
			.findOne({fridge_no: fridge_id})
			.exec(function(err, fridge){

				if(err){
					deferred.reject('Error listening to fridge');
					return deferred.promise;
				}

				if(!fridge){
					deferred.reject('Fridge doesn\'t exist!');
					return deferred.promise;
				}

				var userModel = require('../../models/User.model');

				userModel
					.findOne({username: user.username})
					.exec(function(err, user){

						if(err){
							deferred.reject('Error finding your user profile');
							return deferred.promise;
						}

						if(user.fridges.indexOf(fridge_id) === -1){
							user.fridges = user.fridges.concat([fridge_id]);
						}else{
							deferred.reject('Already listening to fridge');
							return deferred.promise;
						}

						user.save(function (err, user) {

							if(err){
								deferred.reject('Error finding your user profile');
							}else{
								deferred.resolve(user.fridges);
							}

						});
					});
			});

		return deferred.promise;
	},

	unlistenToFridge: function(fridge_id, user){

		var fridgeModel = require('../../models/Fridge.model').fridge;

		deferred = q.defer();

		fridgeModel
			.findOne({fridge_no: fridge_id})
			.exec(function(err, fridge){

				if(err){
					deferred.reject('Error delistening to fridge');
					return deferred.promise;
				}

				if(!fridge){
					deferred.reject('Fridge doesn\'t exist!');
					return deferred.promise;
				}

				var userModel = require('../../models/User.model');

				userModel
					.findOne({username: user.username})
					.exec(function(err, user){

						if(err){
							deferred.reject('Error finding your user profile');
							return deferred.promise;
						}

						if(user.fridges.indexOf(fridge_id) === -1){
							deferred.reject('You are not listening to that fridge');
							return deferred.promise;
						}else{

							var index = user.fridges.indexOf(fridge_id);

							user.fridges.splice(index, 1);
						}

						user.save(function (err, user) {

							if(err){
								deferred.reject('Error finding your user profile');
							}else{
								deferred.resolve(user.fridges);
							}

						});
					});
			});

		return deferred.promise;
	}

};


module.exports = users;
