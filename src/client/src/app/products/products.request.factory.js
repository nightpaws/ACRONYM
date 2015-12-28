/**
 * Created by Tom on 20/12/2015.
 */

angular.module('products')
	.factory('products.request.factory', ['$http', 'config', function($http, config){

		var requestHelper = {};

		requestHelper.search = function(searchString, number){

			if(!number) number = 0;

			var url = config.API_URL + '/products';

			return $http({
				method: 'GET',
				url: url,
				params: {
					searchString: searchString,
					fromNo: number
				}
			})
		};

		requestHelper.add = function(product){

			var url = config.API_URL + '/products';

			return $http({
				method: 'PUT',
				url: url,
				data: product
			})

		};

		requestHelper.update = function (product){

		};

		requestHelper.get = function (id) {

			var url = config.API_URL + '/products/' + id;

			return $http({
				method: 'GET',
				url: url
			})

		};



		return requestHelper;

}]);
