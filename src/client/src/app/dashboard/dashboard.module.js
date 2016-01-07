/**
 * Created by Tom on 07/01/2016.
 */

angular.module('dashboard', [])
	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('page.dashboard', {
				url: '',
				templateUrl: 'app/dashboard/dashboard.main.html',
				controller: 'dashboard.main.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Dashboard';
				}
			})

	}]);
