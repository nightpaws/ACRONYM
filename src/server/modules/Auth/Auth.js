var Auth = {

	validateUser: function(username, passphrase){

		if(username === 'Test' && passphrase === 'Test'){
			return {username: 'Test', type: 'human'};
		}
	}

};

module.exports = Auth;