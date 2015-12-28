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
					return;
				}

		        if(user.fridges.length === 0){
			        deferred.resolve([]);
			        return;
		        }

		        var fridgeModel = require('../../models/Fridge.model').fridge;

		        fridgeModel
			        .where('fridge_no').in(user.fridges)
			        .select('fridge_no name description')
			        .exec(function(err, fridges){

				        if(err){
					        deferred.reject('Error finding your fridges');
					        return;
				        }

				        deferred.resolve(fridges);
			        });

            });

        return deferred.promise;

    }

};


module.exports = fridges;
