/**
 * Created by Thomas on 11/6/2015.
 */

var response = function(){

	var responseGen = {

		response: {
			successful: false,
			message: null,
			meta: null,
			result: null
		},
		setSuccessful:  function (successful) {
			this.response.successful = successful;
		},
		setMessage: function (message) {
			this.response.message = message;
		},
		setMeta:  function (meta) {
			this.response.meta = meta;
		},
		setResult:  function (result) {
			this.response.result = result;
		},
		getResponse:  function () {
			return this.response;
		}

	};

    return responseGen;

};

module.exports = response;
