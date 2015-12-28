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
			.state('page.productsAdd', {
				url: 'products/add',
				templateUrl: 'app/products/products.edit.html',
				controller: 'products.edit.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Products';
				}
			})
			.state('page.productsEdit', {
				url: 'products/:id/edit',
				templateUrl: 'app/products/products.edit.html',
				controller: 'products.edit.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Products';
				}
			})
			.state('page.productsView', {
				url: 'products/:id',
				templateUrl: 'app/products/products.view.html',
				controller: 'products.view.controller',
				onEnter: function($rootScope){
					$rootScope.app.stateTitle = 'Products';
				}
			})

	}]);