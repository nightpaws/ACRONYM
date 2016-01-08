/**
 * Created by Tom on 07/01/2016.
 */

var q = require('q');
var deferred = q.defer();
var mongoose = require('mongoose');
var config = require('../../../config');

var dash = {

	getDash: function(user){

		deferred = q.defer();

		if (user.type !== 'user') {
			deferred.reject('Wrong user type');
		}


		var userModel = require('../../models/User.model');

		userModel
			.findOne({username: user.username})
			.exec(function(err, user){

				if(err || !user){
					deferred.reject('Error finding your user profile');
				}else{

					var response = {
						warnings: [],
						meta: {}
					};

					response.meta.no_fridges = user.fridges.length;
					response.meta.no_contents = 0;

					if(user.fridges.length === 0){
						deferred.resolve(response);
					}

					var fail = false;

					var at = 0;
					for(var i = 0; i < user.fridges.length; i++){

						var fridge = user.fridges[i];




						checkFridgeInfo(fridge, response, function(err, list){

							if(err){
								deferred.reject('Error checking fridges');
							}else{
								response.warnings = response.warnings.concat(list);
							}

							if(++at === user.fridges.length){

								if(fail){
									deferred.reject('Error checking fridges');
								}else{
									deferred.resolve(response);
								}

							}

						});

					}
				}

			});


		return deferred.promise;

	}


};

function checkFridgeInfo(fridge_id, response, next){

	var fridgeModel = require('../../models/Fridge.model').fridge;
	require('../../models/Product.model');

	function Warning(fridge_no, fridge_name, message, type, object){

		this.fridge_no = fridge_no;
		this.fridge_name = fridge_name;
		this.message = message;
		this.type = type;
		this.object = object;

	}

	fridgeModel
		.findOne({fridge_no: fridge_id})
		.populate('contents.product')
		.exec(function(err, fridge){

			if(err || !fridge){
				next((new Error("Cant find your fridge")));
				return;
			}

			var warnings = [];


			if(fridge.states.length > 0){
				var state = fridge.states[fridge.states.length -1];

				if( state.door ){

					warnings.push( new Warning(fridge_id, fridge.name, 'The fridge door is open', 1001) );
				}

				if( state.temperature > 7 ){

					warnings.push( new Warning(fridge_id, fridge.name, 'Temperature is at ' + state.temperature + ' degrees', 1011, {temperature: state.temperature}) );
				}else if( state.temperature < 1 ){
					warnings.push( new Warning(fridge_id, fridge.name, 'Temperature is at ' + state.temperature + ' degrees', 1012, {temperature: state.temperature}) );
				}

				var warningWeight = 140000*1000;
				var maxWeight = 150000*1000;
				if( state.weight > warningWeight){

					warnings.push( new Warning(fridge_id, fridge.name, 'Fridge is getting rather full', 1021, { current_weight: state.weight, max_weight: maxWeight}) );

				}
			}

			if(fridge.contents.length > 0){

				response.meta.no_contents += fridge.contents.length;

				fridge.contents.forEach(function(content){

					if(content.product.name === 'Unnamed Product' || !content.product.name){
						warnings.push( new Warning(fridge_id, fridge.name, 'Product has no name', 1031, { content: content }) );
					}else if( content.product.description === '-' || !content.product.description){
						warnings.push( new Warning(fridge_id, fridge.name, 'Product has no description', 1032, { content: content }) );
					}

				});

			}

			next(null, warnings);


		});
}


module.exports = dash;

