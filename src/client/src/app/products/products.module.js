/**
 * Created by Tom on 19/12/2015.
 */

angular.module('products', [])
	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('page.products', {
				url: 'products/',
				template: '<div style="padding: 4rem 1rem;"><h1 style="text-align: center">Welcome to the products</h1></div> ',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Products';
				}
			})

	}]);