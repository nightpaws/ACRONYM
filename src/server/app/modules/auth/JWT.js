var jwt = require('jsonwebtoken');
var fs = require('fs');
var config = require('../../../config');

var JWT = {

	generateAuth: function(data){


		var cert = fs.readFileSync(config.userAuth.privateKeySrc);
		return jwt.sign(data, cert, { algorithm: 'RS256'});

	},

	validateToken: function(token){

		var cert = fs.readFileSync(config.userAuth.publicKeySrc);

		try {

			return jwt.verify(token, cert, {algorithms: ['RS256']});

		}catch(err){
			return;
		}
	}

};

module.exports = JWT;