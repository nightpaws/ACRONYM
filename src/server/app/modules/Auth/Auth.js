var Auth = {

	validateUser: function(username, passphrase){

		if(username === 'Test' && passphrase === 'Test'){

			var JWT = require('./JWT');
			return JWT.generateAuth({username: 'Test', type: 'human'});
		}
	},

	registerUser: function(username, email, passphrase){

		var q = require('q');

		var deferred = q.defer();


		var userModel = require('../../models/user.model');

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
							var JWT = require('./JWT');

							deferred.resolve(JWT.generateAuth({username:username, email: email}));
						}
					});
				}
			});
		});

		return deferred.promise;
	}

};

module.exports = Auth;