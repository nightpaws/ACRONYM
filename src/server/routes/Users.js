var express = require('express'),
	bodyParser = require('body-parser'),
	response = require('../Response/Response')();

var users = function(){

	var userRouter = express.Router();


	/**
	 *
	 * @api {post} /api/users/auth Authenticate
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
	userRouter.route('/auth')
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

	/**
	 *
	 * @api {post} /api/users/register Register
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
	userRouter.route('/register')
		.post(function(req, res){

			res.send('Gonna naw do that yet');

		});

	return userRouter;
};

module.exports = users;