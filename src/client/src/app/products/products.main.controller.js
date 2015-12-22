/**
 * Created by Tom on 20/12/2015.
 */

angular.module('products')
	.controller('products.main.controller', [ '$scope', 'deviceDetector', '$timeout', 'products.request.factory', function($scope, deviceDetector, $timeout, requestHelper){

		$scope.searchString = "";
		var number = 0;

		console.log(deviceDetector);


		var timer;
		var isFirst = true;
		if(deviceDetector.isMobile()){

			if(isFirst){
				isFirst = false;
				return;
			}

			$scope.$watch('searchString', function(){

				if(timer) timer.cancel();

				timer = $timeout(function(){

					$scope.search();

				}, 2000);

			});
		}

		$scope.search = function () {

			alert('searching');

			requestHelper.search($scope.searchString, number)
				.then(function(data){
					console.log(data);

					number += 20;
				});

		};

	}]);
