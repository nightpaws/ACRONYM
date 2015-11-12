/**
 * Created by Thomas on 10/29/2015.
 */

var app = angular.module('CS413', ['CS413.config', 'ui.router']);

app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);

        $urlRouterProvider.otherwise('/page-not-found');

        $stateProvider
            .state('dashboard', {
                url: '/',
                views: {
                    'header':{
                        template: 'header'
                    },
                    'nav':{
                        template: 'nav'
                    },
                    main:{
                        template: 'main'
                    }
                }
            })
            .state('404', {
                url: '/page-not-found',
                views: {
                    'header':{
                        template: 'header'
                    },
                    'nav':{
                        template: 'nav'
                    },
                    main:{
                        template: '<h1>You have just 404\'d well done you!</h1>'
                    }
                }
            });

        $locationProvider.html5Mode(true);

}]);