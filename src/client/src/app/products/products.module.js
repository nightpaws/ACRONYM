/**
 * Created by Tom on 19/12/2015.
 */

angular.module('products', [])
	.config(['$stateProvider', function($stateProvider) {

		$stateProvider
			.state('page.products', {
				url: 'products/',
				templateUrl: 'app/products/products.main.html',
				controller: 'products.main.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Products';
				}
			})

	}]);