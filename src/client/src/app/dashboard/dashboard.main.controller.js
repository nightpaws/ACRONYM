/**
 * Created by Tom on 07/01/2016.
 */

angular.module('dashboard')
	.controller('dashboard.main.controller', ['$scope', 'dashboard.request.factory', 'toastr', function($scope, requestHelper, toastr){

		$scope.warnings = {
			content: [],
			fridge: []
		};

		requestHelper.getDashboardInfo()
			.then(function(data){

				if(!data.data.successful){
					toastr.error(data.data.message, 'Error');
				}else{

					contentWarnings = [1031, 1032];
					fridgeWarnings = [1001, 1011, 1012, 1021];

					data.data.result.forEach(function(item){

						console.log(item);
						console.log(contentWarnings.indexOf(item.type));

						if(contentWarnings.indexOf(item.type) !== -1){

							$scope.warnings.content.push(item);

						}else if(fridgeWarnings.indexOf(item.type) !== -1){

							$scope.warnings.fridge.push(item);

						}else{
							toastr.error('Unknown warning type', 'Error');
						}



					});

				}

			})
			.catch(function(data){
				toastr.error('Couldn\'t reach server sorry about that', 'Error');
			})


	}]);
