/**
 * Created by Tom on 16/12/2015.
 */

angular.module('user')
	.controller('user.login.controller', ['$scope', 'user.service', function($scope, userService){

		$scope.user = {
			username: null,
			password: null,
			accept: null,
			email: null
		};

		$scope.login = function(isValid){

			if(!isValid){
				return;
			}

			userService.login($scope.user.username, $scope.user.password);

		};

		$scope.register = function(isValid){

			if(!isValid){
				return;
			}

			userService.register($scope.user.username, $scope.user.email, $scope.user.password);
		};

	}]);