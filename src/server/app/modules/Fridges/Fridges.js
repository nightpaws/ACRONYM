/**
 * Created by Thomas on 24/11/2015.
 */

var q = require('q');
var deferred = q.defer();
var mongoose = require('mongoose');
var config = require('../../../config');

var fridges = {

    getFridge: function(fridge_id){

        var fridgeModel = require('../../models/Fridge.model');
        deferred = q.defer();

        fridgeModel.findByID(fridge_id, function(err, doc){

            if(err){
                deferred.reject("Error with product code");
            }else if(doc){
                deferred.resolve(doc);
            }
        })

        return deferred.promise();

    }

};


module.exports = fridges;
