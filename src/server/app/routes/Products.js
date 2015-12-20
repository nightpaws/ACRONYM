/**
 * Created by Tom on 07/11/2015.
 */

var express = require('express');

var products = function(){

	var productsRouter = express.Router();

	productsRouter.route('/')
		/**
		 *
		 * @api {get} /products?searchText= Search products ?fromNo=
		 * @apiName SearchProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Search through the product database to find the text in
		 * the title or the description
		 *
		 * @apiParam {Text} searchText The text to search for
		 * @apiParam {Number} fromNo The number to start returning from defaults to 0
		 *
		 * @apiSuccessExample {json} Results
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": [
		 *          {
		 *              "_id": PRODUCT ID,
		 *		        "code": BARCODE,
		 *		        "name": PRODUCT NAME,
		 *		        "weight": WEIGHT,
		 *		        "description": DESCRIPTION
		 *		        "__v": 0
		 *          },
		 *          {
		 *              "_id": PRODUCT ID,
		 *		        "code": BARCODE,
		 *		        "name": PRODUCT NAME,
		 *		        "weight": WEIGHT,
		 *		        "description": DESCRIPTION
		 *		        "__v": 0
		 *          }
		 *      ]
		 *  }
		 *
		 *  @apiSuccessExample {json} No Results
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": null
		 *  }
		 *
		 *  @apiErrorExample {json} Error:
		 *  {
		 *      "success": false,
		 *      "message": "Error Searching DB,
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.get(function(req, res){

			var products = require('../modules/products/Products');
			var response = require('./../response/Response')();
			var promise = products.searchProducts(req.query['searchText'], req.query['fromNo']);

			promise
				.then(function(data){
					response.setSuccessful(true);
					response.setResult(data);
					response.setMeta({
						results: data.length
					});

					res.json(response.getResponse());
				})
				.fail(function(data){
					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});


		})
		/**
		 * @api {put} /products/ Add Product
		 * @apiName AddProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Add a new product to the product database
		 *
		 * @apiParamExample {json} Request Example
		 *  {
		 *      "name": PRODUCT NAME,
		 *      "code": BARCODE,
		 *      "weight": WEIGHT,
		 *      "description": DESCRIPTION
		 *  }
		 *
		 * @apiSuccessExample {json} Success
		 *  {
		 *      "success": true,
		 *      "message": null,
		 *      "meta": null,
		 *      "result": {
		 *          "_id": PRODUCT ID,
		 *		    "code": BARCODE,
		 *		    "name": PRODUCT NAME,
		 *		    "weight": WEIGHT,
		 *		    "description": DESCRIPTION
		 *		    "__v": 0
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error:
		 *  {
		 *      "success": false,
		 *      "message": "error saving product",
		 *      "meta": null,
		 *      "result": null
		 *  }
	    */
		.put(function(req, res){


			var products = require('../modules/products/Products');
			var promise = products.addProduct(req.body);
			var response = require('./../response/Response')();

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

	productsRouter.route('/:id')
		/**
		 * @api {get} /products/:id Get Product
		 * @apiName GetProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Get a product from the database
		 *
		 * @apiParam {Number} id ProductID
		 *
		 * @apiSuccessExample {json} Product Found
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": {
		 *          "_id": "56488392e6159a14220cbbec",
		 *		    "code": 500159393942,
		 *		    "name": "Galaxy Smoth Milk Chocolate",
		 *		    "weight": 400,
		 *		    "__v": 0
		 *      }
		 *  }
		 *
		 *  @apiSuccessExample {json} Product Doesn't Exist
		 *  {
		 *      "success": true,
		 *      "message": "User logged in",
		 *      "meta": null,
		 *      "result": null
		 *
		 *
		 *  @apiErrorExample {json} Error example
		 *  {
		 *      "success": false,
		 *      "message": "Error Reaching DB",
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.get(function(req, res){

			var products = require('../modules/products/Products');
			var promise = products.getProduct(req.params.id);
			var response = require('./../response/Response')();

			promise
				.then(function(data){
					response.setSuccessful(true);
					response.setResult(data);

					res.json(response.getResponse());
				})
				.fail(function(data){

					console.log(data);

					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});
		})
		/**
		 *
		 * @api {post} /products/:id Update Product
		 * @apiName UpdatProduct
		 * @apiGroup Product
		 *
		 * @apiDescription
		 * Update the product in the database
		 *
		 * @apiParam {Number} id ProductID
		 *
		 * @apiParamExample {json} Request Example
		 *  {
		 *      "name": PRODUCT NAME,
		 *      "code": BARCODE,
		 *      "weight": WEIGHT,
		 *      "description": DESCRIPTION
		 *  }
		 *
		 * @apiSuccessExample {json} Success
		 *  {
		 *      "success": true,
		 *      "message": null,
		 *      "meta": null,
		 *      "result": {
		 *          "_id": PRODUCT ID,
		 *		    "code": BARCODE,
		 *		    "name": PRODUCT NAME,
		 *		    "weight": WEIGHT,
		 *		    "__v": 0
		 *      }
		 *  }
		 *
		 *  @apiErrorExample {json} Error:
		 *  {
		 *      "success": false,
		 *      "message": "error saving product",
		 *      "meta": null,
		 *      "result": null
		 *  }
		 */
		.post(function(req, res){

			var products = require('../modules/products/Products');
			var response = require('./../response/Response')();
			var promise = products.updateProduct(req.params.id, req.body);

			promise
				.then(function(data){
					response.setSuccessful(true);
					response.setResult(data);

					res.json(response.getResponse());
				})
				.fail(function(data){

					console.log(data);

					response.setSuccessful(false);
					response.setMessage(data);

					res.json(response.getResponse());
				});
		});

	return productsRouter;
};

module.exports = products;