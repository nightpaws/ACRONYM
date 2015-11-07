var config = {
	ports:{
		http: 80,
		https: 443
	},

	logging:{
		logDir: './logs',
		logFile: '/access.log'
	},

	secure:{
		ignore: [
			'/users/auth'
		]
	},

	ssl:{
		https: true,
		keySrc: './sslcert/server.key',
		publicKeySrc: './sslcert/server.pub',
		certSrc: './sslcert/server.crt',
		format: 'utf8'
	}
};


module.exports = config;