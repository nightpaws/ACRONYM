/**
 * Created by Tom on 20/12/2015.
 */

angular.module('products')
	.controller('products.main.controller', [ '$scope', 'deviceDetector', '$timeout', 'products.request.factory', '$state', 'toastr',
		function($scope, deviceDetector, $timeout, requestHelper, $state, toastr){

			$scope.searchString = "";
			$scope.usedSearchString = "*";
			$scope.products = [];
			var number = 0;
			var stopSearching = false;


			var timer;
			$scope.isFirst = true;
			$scope.$watch('searchString', function(){

				if($scope.isFirst){
					$scope.isFirst = false;
					return;
				}

				if(timer) $timeout.cancel(timer);

				timer = $timeout(function(){

					$scope.search();

				}, 1200);
			});

			$scope.search = function () {

				if($scope.searchString == $scope.usedSearchString){

				}else{
					number = 0;
					$scope.products = [];
				}

				if(!$scope.searchString){
					$scope.usedSearchString = '*';
				}else{
					$scope.usedSearchString = $scope.searchString;
				}



				requestHelper.search($scope.usedSearchString, number)
					.then(function(data){

						if(data.data.successful){

							handleProductReturn(data.data.result);

						}else{
							toastr.error(data.data.message, 'Error');
						}

					})
					.catch(function(){
						toastr.error('Couldn\'t reach server sorry about that', 'Error');
					});

			};

			$scope.loadMore = function(){

				if(stopSearching) return;

				console.log('loading more');

				$scope.search();

			};

			$scope.goTo = function(id){

				$state.go('page.productsView', {id: id});

			};

			function handleProductReturn(products){

				if(products.length === 0){

					stopSearching = true;

					return;
				}

				number += products.length;

				products.forEach(function(item){

					if(!item.name){
						item.name = 'Unknown Product';
					}

					if(item.description && item.description.length > 100){

						item.description = item.description.substring(0, 100) + '...';
					}


				});

				$scope.products = $scope.products.concat(products);
			}

			$scope.search();

	}]);
