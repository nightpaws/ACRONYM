var express = require('express'),
	bodyParser = require('body-parser'),
	response = require('./../response/Response')();

var users = function(){

	var userRouter = express.Router();

	/**
	 *
	 * @api {post} /users/auth Authenticate
	 * @apiName AuthenticateUser
	 * @apiGroup User
	 *
	 * @apiDescription
	 * You a user? You logged out? Well make a cheeky wee request to this then, what are you waiting for!
	 *
	 * @apiParamExample {json} Request-Example:
	 *  {
	 *      "username": "username",
	 *      "passphrase": "passphrase"
	 *  }
	 *
	 * @apiSuccessExample {json} Success-app.response:
	 *  {
	 *      "success": true,
	 *      "message": "User logged in",
	 *      "meta": null,
	 *      "result": {
	 *          "token": TOKEN
	 *      }
	 *  }
	 *
	 *  @apiErrorExample {json} Error-app.response:
	 *  {
	 *      "success": false,
	 *      "message": "Invalid Login",
	 *      "meta": null,
	 *      "result": null
	 *  }
	 */
	userRouter.route('/auth')
		.post(function(req, res){

			var data = req.body;

			var Auth = require('./../modules/auth/UserAuth');
			var promise = Auth.validateUser(data.username, data.passphrase);

			promise
				.then(function(data){
					response.setSuccessful(true);
					response.setMessage('User logged in');
					response.setResult({token: data});

					res.json(response.getResponse());
				})
				.fail(function(data){

					response.setSuccessful(false);
					var message = (data.error) ? 'Error resolving password': (data.wrongPass) ? 'Error: wrong username or password' : '';

					response.setMessage(message);
					res.json(response.getResponse());
				});

		});

	/**
	 *
	 * @api {post} /users/register Register
	 * @apiName RegisterUser
	 * @apiGroup User
	 *
	 * @apiDescription
	 * You not a user? You wishing you where a user of this wonderful service? Well I have the API for you!
	 *
	 * @apiParamExample {json} Request-Example:
	 *  {
	 *      "username": "username",
	 *      "passphrase": "passphrase",
	 *      "email": "email"
	 *  }
	 *
	 * @apiSuccessExample {json} Success-app.response:
	 *  {
	 *      "success": true,
	 *      "message": "User logged in",
	 *      "meta": null,
	 *      "result": {
	 *          "token": TOKEN
	 *      }
	 *  }
	 *
	 *  @apiErrorExample {json} Error-app.response:
	 *  {
	 *      "success": false,
	 *      "message": "Invalid Login",
	 *      "meta": null,
	 *      "result": null
	 *  }
	 */
	userRouter.route('/register')
		.post(function(req, res){

			//res.send('Gonna naw do that yet');

			var data = req.body;

			var auth = require('../modules/auth/UserAuth');
			var tokenPromise = auth.registerUser(data.username, data.email, data.passphrase);

			tokenPromise
				.then(function(data){

					response.setSuccessful(true);
					response.setMessage('User logged in');
					response.setResult({token: data});

					res.json(response.getResponse());

				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});
		});

	return userRouter;
};

module.exports = users;