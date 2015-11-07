var express = require('express'),
	bodyParser = require('body-parser'),
	response = require('../Response/Response')();

var users = function(){

	var userRouter = express.Router();

	userRouter
		.route('/')
			.post(function(req, res){

				console.log(req.user);

				res.send({hello: 'dsfd'});
			})
			.put(function(req, res){
				res.send({hello: 'fisdfssh'});
			});

	userRouter
		/**
		 *
		 * @api {post} /api/users/auth Authenticate
		 * @apiName AuthenticateUser
		 * @apiGroup User
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
		 *      "username": "username",
		 *      "passphrase": "passphrase"
		 *  }
		 *
		 * @apiSuccessExample {json} Success-Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "token": "token"
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-Response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Login",
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.route('/auth')
			.post(function(req, res){

				var data = req.body;

				var Auth = require('../Modules/Auth/Auth');
				var user = Auth.validateUser(data.username, data.passphrase);

				if(user){

					var JWT = require('../modules/Auth/JWT');
					var token = JWT.generateAuth({foo: 'bar'});

					response.setSuccessful(true);
					response.setMessage('User logged in');
					response.setResult({token: token});

					res.json(response.getResponse());

				}else{
					response.setSuccessful(false);
					response.setMessage('Invalid Login');

					res.json(response.getResponse());
				}
			});

	return userRouter;
};

module.exports = users;