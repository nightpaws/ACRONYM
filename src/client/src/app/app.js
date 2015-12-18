/**
 * Created by Thomas on 10/29/2015.
 */

var app = angular.module('CS413', ['CS413.config', 'ui.router', 'ui.bootstrap', 'user', 'general', 'LocalStorageModule', 'ngAnimate', 'toastr',
						'polyfill']);

app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlMatcherFactory, $urlRouterProvider) {

	$urlMatcherFactory.caseInsensitive(true);
	$urlMatcherFactory.strictMode(false);

	$urlRouterProvider.otherwise('/page-not-found');

	$stateProvider
		.state('dashboard', {
			url: '/',
			views: {
				'header': {
					templateUrl: 'app/header/header.html'
				},
				'nav': {
					template: 'nav'
				},
				'main': {
					template: 'main <h1>Imagine a beautiful system here </h1>'
				}
			}
		})
		.state('404', {
			url: '/page-not-found',
			views: {
				'header': {
					template: ''
				},
				'nav': {
					template: ''
				},
				'main': {
					templateUrl: 'app/general/404.html'
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
		});

	$locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$state', '$location', 'user.service', '$timeout', function($rootScope, $state, $location, userService, $timeout){

	//print ui-router errors
	$rootScope.$on("$stateChangeError", console.log.bind(console));

	$rootScope.app = {
		showNav: true,
		showHeader: true
	};


	if(!userService.loadUser()){
		$location.path('/user/login');
	}

	$timeout(function(){

		angular.element(document).ready(function(){

			angular.element( document.getElementById('body-loading') ).addClass('fadeout');
			angular.element( document.getElementById('body-loading-content') ).addClass('fadeout-quick');
		})


	}, 3000);




}]);