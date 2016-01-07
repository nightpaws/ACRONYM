/**
 * Created by Tom on 07/01/2016.
 */

angular.module('dashboard')
	.factory('dashboard.request.factory', ['$http', 'config', function($http, config){

		var requestHelper = {};

		requestHelper.getDashboardInfo = function(){

			var url =config.API_URL +  '/dashboard';

			return $http({
				method: 'GET',
				url: url
			})

		};

		return requestHelper;

	}]);
