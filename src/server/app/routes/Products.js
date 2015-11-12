/**
 * Created by Tom on 07/11/2015.
 */

var express = require('express'),
	response = require('./../Response/Response')();

var products = function(){

	var productsRouter = express.Router();

	productsRouter.route('/')
		/**
		 * @api {get} /api/products/ Search Products
		 * @apiName SearchProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Search through the product database
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
		 *      "PRODCUT": "INFO"       //TODO
		 *  }
		 *
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": [
		 *          {"PRODUCT": "INFO"},    //TODO
		 *          {"PRODUCT": "INFO"}
		 *      ]
		 *  }
		 *
		 *  @apiErrorExample {json} DB-Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "DB is busted",
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(res, req){

			res.send('Gonna naw do that yet');

		})
		/**
		 * @api {put} /api/products/ Add Product
		 * @apiName AddProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Add a new product to the product database
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
		 *      "PRODCUT": "INFO"       //TODO
		 *  }
		 *
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} DB-Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "DB is busted",
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.put(function(res, req){
			res.send('Gonna naw do that yet');
		});

	productsRouter.route('/:id')
		/**
		 * @api {get} /api/products/:id Get Product
		 * @apiName GetProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Get a product from the database
		 *
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.get(function(req, res){

			res.send('Gonna naw do that yet');

		})
		/**
		 * @api {post} /api/products/:id Update Product
		 * @apiName UpdatProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Update the product in the database
		 *
		 * @apiParamExample {json} Request-Example:
		 *  {
		 *      "PRODCUT": "INFO"       //TODO
		 *  }
		 *
		 * @apiSuccessExample {json} Success-app.Response:
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "PRODUCT": "INFO"   //TODO
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error-app.Response:
		 *  {
		 *      "success": false,
		 *      "message": "Invalid Product Id,
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.post(function(req, res){

			res.send('Gonna naw do that yet');

		});

	return productsRouter;
};

module.exports = products;