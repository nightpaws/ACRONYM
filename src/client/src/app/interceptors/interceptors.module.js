/**
 * Created by Tom on 19/12/2015.
 */

angular.module('interceptors', [])
	.config(['$httpProvider', function($httpProvider){

		$httpProvider.interceptors.push('sessionInjector');
		$httpProvider.interceptors.push('errorHandler');

	}]);
