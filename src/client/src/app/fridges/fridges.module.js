/**
 * Created by Tom on 19/12/2015.
 */

angular.module('fridges', [])
	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('page.fridges', {
				url: 'fridges/',
				template: '<div style="padding: 4rem 1rem;"><h1 style="text-align: center">See your fridges</h1></div> ',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Fridges';
				}
			})

	}]);
