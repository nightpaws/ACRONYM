/**
 * Created by Thomas on 24/11/2015.
 */

var q = require('q');
var deferred = q.defer();
var mongoose = require('mongoose');
var config = require('../../../config');

var fridges = {

    getFridge: function(fridge_id){

        var fridgeModel = require('../../models/Fridge.model').fridge;
        deferred = q.defer();

        fridgeModel.findOne({fridge_no: fridge_id}, function(err, doc){

            if(err){
                deferred.reject("Error finding fridge");
            }else if(doc){
                deferred.resolve(doc);
            }else{
	            deferred.reject('fridge doesnt exist');
            }
        });

        return deferred.promise;
    },

    getFridges: function(user) {

        var userModel = require('../../models/User.model');

        deferred = q.defer();

        userModel
            .findOne({username: user.username})
            .exec(function (err, user) {

				if(err){
					deferred.reject('Error finding your user profile');
					return deferred.promise;
				}

		        if(user.fridges.length === 0){
			        deferred.resolve([]);
			        return deferred.promise;
		        }

		        var fridgeModel = require('../../models/Fridge.model').fridge;

		        fridgeModel
			        .where('fridge_no').in(user.fridges)
			        .select('fridge_no name description')
			        .exec(function(err, fridges){

				        if(err){
					        deferred.reject('Error finding your fridges');
					        return deferred.promise;
				        }

				        deferred.resolve(fridges);
			        });

            });

        return deferred.promise;

    },

	updateState: function(fridge_id, state, fridge){

		deferred = q.defer();

		if(fridge_id != fridge.fridge_no || fridge.type != 'fridge'){

			deferred.reject('You dont have permission to do that');
			return deferred.promise;
		}

		var fridgeModel = require('../../models/Fridge.model').fridge;

		fridgeModel
			.findOne({fridge_no: fridge_id}, function(err, doc){

				if(err){
					deferred.reject('Error finding fridge');
				}else if(doc){

					var dateLimit = new Date().getTime() - 24 * 60 * 60 * 1000;
					var states = [];

					doc.states.forEach(function (item) {

						var date = new Date(item.date);

						console.log(date);

						if( date.getTime() > dateLimit ){
							states.push(item);
						}

					});

					states.push(state);

					doc.states = states;

					doc.save(function(err, doc){

						if(err){

							if(err.name == "ValidationError"){
								deferred.reject('Validation error');
							}else
								deferred.reject('Error finding fridge');
						}else if(doc){

							deferred.resolve(doc);

						}else{
							deferred.reject('Error fridge doesn\'t exist');
						}

					});

				}else{
					deferred.reject('Error fridge doesn\'t exist');
				}

			});

		return deferred.promise;

	},

	getState: function(fridge_id, user){

		var fridgeModel = require('../../models/Fridge.model').fridge;
		deferred = q.defer();

		fridgeModel.findOne({fridge_no: fridge_id}, function(err, doc){

			if(err){
				deferred.reject("Error finding fridge");
			}else if(doc){
				deferred.resolve(doc.states[doc.states.length -1]);
			}else{
				deferred.reject('fridge doesnt exist');
			}
		});

		return deferred.promise;

	}

};


module.exports = fridges;
