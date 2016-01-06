/**
 * Created by Tom on 22/12/2015.
 */

angular.module('products')
	.controller('products.edit.controller', ['$scope', '$state', '$stateParams', 'products.request.factory', 'toastr', function ($scope, $state, $stateParams, productRequestHelper, toastr) {

		$scope.product = {
			name: null,
			barcode: null,
			description: null,
			weight: null
		};

		var method;

		if($state.current.name === 'page.productsAdd'){
			method = productRequestHelper.add;
		}else if($state.current.name === 'page.productsEdit'){
			method = productRequestHelper.update;

			productRequestHelper.get($stateParams.id)
				.then(function(data){

					if(data.data.successful){

						$scope.product = data.data.result;

					}else{
						toastr.error(data.data.message, 'Error');
					}
				})
				.catch(function(){
					toastr.error('Couldn\'t reach server sorry about that', 'Error');
				});
		}else{
			$state.go('page-not-found');
		}

		$scope.save = function(invalid){

			if(invalid) return;

			method($stateParams.id, $scope.product)
				.then(function(data){

					if(data.data.successful){

						$state.go('page.productsView', {id: $scope.product.barcode});

					}else{

						if(data.data.message === 'Product Already Exists'){

							toastr.warning(data.data.message, 'Warning');

							$state.go('page.productsView', {id: $scope.product.barcode});

						}else
							toastr.error('Server broke while saving data, sorry about that.', 'Error');
					}

				})
				.catch(function (data) {
					toastr.error('Couldn\'t reach server sorry about that', 'Error');
				});
		}

	}]);
