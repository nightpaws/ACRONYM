/**
 * Created by Tom on 05/01/2016.
 */

angular.module('fridges')
	.controller('fridges.edit.controller', ['$scope', '$state', '$stateParams', 'fridges.request.factory', 'toastr', function ($scope, $state, $stateParams, requestHelper, toastr) {

		$scope.fridge = {
			name: null,
			description: null
		};

		requestHelper.get($stateParams.id)
			.then(function(data){

				if(data.data.successful){

					$scope.fridge = data.data.result;

				}else{
					toastr.error(data.data.message, 'Error');
				}
			})
			.catch(function(){
				toastr.error('Couldn\'t reach server sorry about that', 'Error');
			});

		$scope.save = function(invalid){

			if(invalid) return;

			requestHelper.save($stateParams.id, $scope.fridge)
				.then(function(data){

					if(data.data.successful){

						$state.go('page.fridgesView', {id: $stateParams.id});

					}else{
							toastr.error(data.data.message, 'Error');
					}

				})
				.catch(function (data) {
					toastr.error('Couldn\'t reach server sorry about that', 'Error');
				});
		}

	}]);
