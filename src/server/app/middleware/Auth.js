var jwt = require('./../modules/auth/JWT'),
	config = require('../../config');

require('string.prototype.startswith');


var Auth = function(req, res, next){

	var noAuth = false;


	config.secure.ignore.map(function(item){

		if(req.path.startsWith(item)){

			noAuth = true;
		}
	});

	if(noAuth){
		next();
		return;
	}




	var token = req.headers['x-access-token'];

	if(token){

		var decoded = jwt.validateToken(token);

		if(decoded){

			req.user = decoded;

		}else{
			var response = require('../response/Response')();

			response.setSuccessful(false);
			response.setMessage('Invalid token, please reauth');

			return res.status(403).json(response.getResponse());
		}

	}else{

		var response = require('../response/Response')();

		response.setSuccessful(false);
		response.setMessage('No auth token provided');

		return res.status(403).json(response.getResponse());
	}

	next();
};

module.exports = Auth;