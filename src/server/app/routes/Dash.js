/**
 * Created by Tom on 07/01/2016.
 */

var express = require('express'),
	bodyParser = require('body-parser'),
	responseFactory = require('./../response/Response');

var dash = function() {

	var dashRouter = express.Router();

	dashRouter.route('/')
		/**
		 *
		 * @api {get} /dashboard Get Dashboard
		 * @apiName Get Dashboard
		 * @apiGroup Dashboard
		 *
		 * @apiDescription
		 * Get the dashboard info
		 *
		 * @apiSuccessExample {json} Results
		 *  {
		 *      "success": true,
		 *      "message": null,
		 *      "meta": null,
		 *      "result": [
		 *          {
         *              "fridge_no": "15",
         *              "message": "temperature is at 0 degrees",
         *              "type": 1012,
         *              "object": {
         *                  "temperature": 0
         *              }
         *          }
		 *      ]
		 *  }
		 *
		 *
		 *  @apiErrorExample {json} Error:
		 *  {
		 *      "success": false,
		 *      "message": "Error Searching DB,
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.get(function(req,res){

			var dash = require('../modules/dash/dash');
			var promise = dash.getDash(req.user);

			var response = responseFactory();

			promise
				.then(function(data){

					response.setSuccessful(true);
					response.setResult(data);

					res.json(response.getResponse());

				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});

		});

	return dashRouter;

};

module.exports = dash;
