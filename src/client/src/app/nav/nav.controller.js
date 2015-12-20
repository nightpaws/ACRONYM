/**
 * Created by Tom on 19/12/2015.
 */

angular.module('nav')
	.controller('nav', ['$rootScope','$scope', function($rootScope, $scope){

		$scope.navigate = function(){
			$rootScope.app.showMenu = false;
		}

	}]);