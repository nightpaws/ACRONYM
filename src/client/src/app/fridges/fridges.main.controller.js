/**
 * Created by Tom on 02/01/2016.
 */

angular.module('fridges')
	.controller('fridges.main.controller', ['$scope', 'fridges.request.factory','$uibModal','toastr', '$state', function ($scope, requestHelper, $uibModal, toastr, $state) {

		$scope.fridges = [];

		$scope.add = function(){

			var modal = $uibModal.open({

				animation: true,
				templateUrl: 'addFridge.html',
				controller: 'addFridgeModalController'
			});

			modal.result.then(function (id) {

				console.log(id);

				requestHelper.listenTo(id)
					.then(function(data){
						if(data.data.successful){

							getAll();

						}else{
							toastr.error(data.data.message, 'Error');
						}

					})
					.catch(function(){
						toastr.error('Couldn\'t reach server sorry about that', 'Error');
					});

			});

		};

		$scope.goTo = function(id){

			$state.go('page.fridgesView', {id: id});

		};

		function getAll(){

			requestHelper.getAll()
				.then(function(data){
					if(data.data.successful){

						handleFridgeReturn(data.data.result);

					}else{
						toastr.error(data.data.message, 'Error');
					}

				})
				.catch(function(){
					toastr.error('Couldn\'t reach server sorry about that', 'Error');
				});


		}

		function handleFridgeReturn(fridges){

			fridges.forEach(function(fridge){

				if(!fridge.name){
					fridge.name = 'Unnamed Fridge - Number ' + fridge.fridge_no;
				}

				if(fridge.description){

					if(fridge.description.length > 100){
						fridge.description = fridge.description.substring(0, 100) + '...';
					}
				}else{
					fridge.description = 'No Description';
				}
			});

			$scope.fridges = fridges;

		}

		//perform initial load
		getAll();

	}])
	.controller('addFridgeModalController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){

		$scope.id = null;

		$scope.ok = function(){

			$uibModalInstance.close($scope.id);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);
