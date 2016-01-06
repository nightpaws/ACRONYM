/**
 * Created by Tom on 02/01/2016.
 */

angular.module('fridges')
	.factory('fridges.request.factory', ['$http', 'config', function($http, config){

		var requestHelper = {};

		requestHelper.getAll = function(){

			var url =config.API_URL +  '/fridges';

			return $http({
				method: 'GET',
				url: url
			})

		};

		requestHelper.get = function(id){

			var url =config.API_URL +  '/fridges/' + id;

			return $http({
				method: 'GET',
				url: url
			})

		};

		requestHelper.save = function(id, fridge){

			var url =config.API_URL +  '/fridges/' + id;

			return $http({
				method: 'POST',
				url: url,
				data: fridge
			})

		};

		requestHelper.listenTo = function(id){

			var url =config.API_URL +  '/fridges/listen/' + id;

			return $http({
				method: 'GET',
				url: url
			})

		};



		return requestHelper;

	}]);
