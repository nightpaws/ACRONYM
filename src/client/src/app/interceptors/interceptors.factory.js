/**
 * Created by Tom on 19/12/2015.
 */

angular.module('interceptors')
	.factory('sessionInjector', ['config', 'localStorageService', function(config, localStorageService){

		var sessionInjector = {

			request: function(request){

				if(request.url.startsWith(config.API_URL)){

					var user = localStorageService.get('user');


					if(user){
						request.headers['x-access-token'] = localStorageService.get('user').token;
					}

				}

				return request;

			}

		};

		return sessionInjector;

	}]);

	//.factory('errorHandler', ['config', '$injector', function(config, $injector){
	//
	//	var errorInjector = {
	//
	//		response: function(response){
	//
	//			if(response.config.url.startsWith(config.API_URL)){
	//
	//				console.log(response);
	//
	//				if(response.status != 200){
	//
	//					var toastr = $injector.get('toastr');
	//
	//					toastr.error('Couldn\'t reach the server sorry about that', 'Error');
	//				}else{
	//				}
	//			}
	//
	//			return response;
	//
	//		}
	//
	//	};
	//
	//	return errorInjector;
	//
	//}]);
