
var q = require('q');
var deferred = q.defer();
var bcrypt = require('bcrypt');
var JWT = require('./JWT');

var userModel = require('../../models/User.model.js');
var mongoose = require('mongoose');

var Auth = {

	validateUser: function(username, passphrase){

		deferred = q.defer();


		userModel.findOne({'username': username}, function(err, doc){

			if(err){

				deferred.reject({
					error: true,
					wrongPass: false
				});
				return;
			}

			if(!doc){

				deferred.reject({
					error: false,
					wrongPass: true
				});
				return;
			}

			bcrypt.compare(passphrase, doc.passphrase, function(err, res){

				if(err){

					console.log(err);

					deferred.reject({
						error: true,
						wrongPass: false
					});
				}else if(!res){
					deferred.reject({
						error: false,
						wrongPass: true
					});
				}else{


					deferred.resolve({
						username: doc.username,
						email: doc.email,
						token: JWT.generateAuth({username: doc.username, email: doc.email, type: 'user'})
					});
					//deferred.resolve(JWT.generateAuth({username: doc.username, email: doc.email, type: 'user'}))
				}
			});
		});

		return deferred.promise;

	},

	registerUser: function(username, email, passphrase){

		var q = require('q');

		var deferred = q.defer();


		var userModel = require('../../models/User.model.js');

		var bcrypt = require('bcrypt');
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(passphrase, salt, function(err, hash) {

				if(err){
					deferred.reject('Error creating user');
				}else{
					var user = new userModel({
						username: username,
						email: email,
						passphrase: hash
					});

					user.save(function(err){
						console.log(err);

						if(err){

							if(err.code === 11000)
								deferred.reject('User Already Exist');
							else
								deferred.reject('Error creating user');


						}else{

							deferred.resolve(JWT.generateAuth({username:username, email: email, type: 'user'}));
						}
					});
				}
			});
		});

		return deferred.promise;
	}

};

module.exports = Auth;