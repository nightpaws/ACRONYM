/**
 * Created by Tom on 20/12/2015.
 */

angular.module('user')
	.controller('user.profile', ['$scope', 'user.service', function($scope, userService){

		const user = userService.getUser();

		$scope.username = user.username;
		$scope.email = user.email;
		$scope.imageurl = user.imageurl;

	}]);
