/**
 * Created by Tom on 16/12/2015.
 */


angular.module('user')
	.factory('user.request.factory', ['$http', 'config', function($http, config){

		var requestHelper = {};

		requestHelper.login = function(username, password){


			return $http({
				method: 'POST',
				url: config.API_URL + '/users/auth',
				data: {
					username: username,
					passphrase: password
				}
			})

		};

		requestHelper.register = function(username, email, password){

			return $http({
				method: 'POST',
				url: config.API_URL + '/users/register',
				data: {
					username: username,
					email: email,
					passphrase: password
				}
			})


		};

		return requestHelper;

	}]);