/**
 * Created by Tom on 19/12/2015.
 */

angular.module('fridges', [])
	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('page.fridges', {
				url: 'fridges/',
				templateUrl: 'app/fridges/fridges.main.html',
				controller: 'fridges.main.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Fridges';
				}
			})
			.state('page.fridgesView', {
				url: 'fridges/:id',
				templateUrl: 'app/fridges/fridges.view.html',
				controller: 'fridges.view.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Fridges';
				}
			})
			.state('page.fridgesEdit', {
				url: 'fridges/:id/edit',
				templateUrl: 'app/fridges/fridges.edit.html',
				controller: 'fridges.edit.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Fridges';
				}
			});

	}]);
