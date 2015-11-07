var jwt = require('../modules/Auth/JWT'),
	config = require('../config');


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
			var response = require('../Response/Response')();

			response.setSuccessful(false);
			response.setMessage('Invalid token, please reauth');

			return res.status(403).json(response.getResponse());
		}
		


	}else{

		var response = require('../Response/Response')();

		response.setSuccessful(false);
		response.setMessage('No Auth token provided');

		return res.status(403).json(response.getResponse());
	}

	next();
};

module.exports = Auth;

/*
 * polyfill in starts with
 */
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}