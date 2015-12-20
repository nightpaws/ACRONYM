/**
 * Created by Tom on 16/12/2015.
 */

angular.module('general', [])
	.config(['$stateProvider',function($stateProvider) {

		$stateProvider
			.state('terms', {
				url: '/general/terms',
				views: {
					'header': {
						template: ''
					},
					'nav': {
						template: ''
					},
					'main': {
						templateUrl: 'app/general/terms.html'
					}
				},
				onEnter: function($rootScope){
					$rootScope.app.showHeader = false;
					$rootScope.app.showNav = false;
				},
				onExit: function($rootScope){
					$rootScope.app.showHeader = true;
					$rootScope.app.showNav = true;
				}
			})
			.state('page.support', {
				url: 'support/',
				templateUrl: 'app/general/support.html',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Support';
				}
			})

	}]);