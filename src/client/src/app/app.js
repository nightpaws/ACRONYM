/**
 * Created by Thomas on 10/29/2015.
 */

var app = angular.module('CS413', ['CS413.config', 'ui.router', 'ui.bootstrap', 'user', 'general', 'LocalStorageModule', 'ngAnimate', 'toastr',
						'polyfill', 'ng.deviceDetector', 'header', 'interceptors']);

app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlMatcherFactory, $urlRouterProvider) {

	//userService.loadUser();

	$urlMatcherFactory.caseInsensitive(true);
	$urlMatcherFactory.strictMode(false);

	$urlRouterProvider.otherwise('/page-not-found');

	$stateProvider
		.state('dashboard', {
			url: '/',
			views: {
				'header': {
					templateUrl: 'app/header/header.html',
					controller: 'header.controller'
				},
				'nav': {
					template: '<div style="padding: 4rem 1rem;"><h1 style="text-align: center">HERE GO NAVIGATION ONE DAY</h1></div> '
				},
				'main': {
					template: '<div style="padding: 4rem 1rem;"><h1 style="text-align: center">HERE GO CONTENT ONE DAY</h1></div> '
				}
			},
			onEnter: function($rootScope){
				$rootScope.app.stateTitle = 'Dashboard';
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

	userService.loadUser();

	//print ui-router errors
	$rootScope.$on("$stateChangeError", console.log.bind(console));

	$rootScope.app = {
		showNav: true,
		showHeader: true
	};




	$timeout(function(){

		$rootScope.app.loaded = true;


	}, 3000);

	$rootScope.$on("$stateChangeStart", function(args){

		console.log('change event');

		if(!userService.getUser()){
			$location.path('/user/login');
		}

	});




}]);