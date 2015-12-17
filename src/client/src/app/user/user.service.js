/**
 * Created by Tom on 16/12/2015.
 */

angular.module('user')
	.service('user.service', ['user.request.factory', 'localStorageService','$location', 'toastr', function(requestHelper, localStorageService, $location, toastr){

		var user = null;

		this.login = function(username, password){

			requestHelper.login(username, password)
				.then(function(data){

					if(data.data.successful === true){

						var response = data.data;

						user = response.result;

						generateGravatar();
						saveUser();

						$location.path('/');

					}else{
						toastr.error(data.data.message, 'Error');
					}

				})
				.catch(function(data){

					toastr.error('Couldn\'t reach server sorry about that', 'Error');

				});

		};

		this.register = function(username, email, password){

			requestHelper.register(username, email, password)
				.then(function(data){

					if(data.data.successful === true){

						var response = data.data;

						user = response.result;

						generateGravatar();
						saveUser();

						$location.path('/');

					}else{
						toastr.error(data.data.message, 'Error');
					}

				})
				.catch(function(data){

					toastr.error('Error reaching server sorry about that', 'Error');

				});

		};

		this.logout = function(){

			localStorageService.remove('user');

			$location.path('/user/login');
		};

		this.getUser = function(){
			return user;
		};

		this.getToken = function(){
			return user.token;
		};

		this.loadUser = function(){

			user = localStorageService.get('user');

			return user;
		};

		var saveUser = function(){

			//save to local storage
			localStorageService.set('user', user);
		};

		var generateGravatar = function(){

			if(!user.email) return;

			var hash = md5( user.email.toLowerCase().trim() );

			user.imageurl = 'http://www.gravatar.com/avatar/' + hash + '.jpeg';
			//to get own image add ?d= then url encoded path
		};

	}]);
