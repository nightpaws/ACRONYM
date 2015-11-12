/**
 * Created by Thomas on 11/10/2015.
 */

angular.module('CS413.user.userService', [])
    .service('user', function(){

        const username = null,
            email = null,
            token = null;

        //TODO load user from local storage
        var loadUser = function(){
            console.log('loading');
        };

        //TODO save user to local storage
        var saveUser = function () {

        };

    });