/**
 * Created by Tom on 22/12/2015.
 */

angular.module('products')
	.controller('products.view.controller', ['$scope', '$stateParams','products.request.factory', 'toastr', '$state',
		function($scope, $stateParams, productRequestHelper, toastr, $state){

		$scope.product = {};

		productRequestHelper.get($stateParams.id)
			.then(function(data){

				if(data.data.successful){

					$scope.product = data.data.result;

				}else{
					toastr.error(data.data.message, 'Error');
				}

			})
			.catch(function () {

				toastr.error('Couldn\'t reach server sorry about that', 'Error');

			});

		$scope.editProduct = function () {

			$state.go('page.productsEdit', {id: $scope.product._id});

		};

	}]);
