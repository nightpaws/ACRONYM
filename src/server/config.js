var config = {
	ports:{
		https: 3001
	},

	logging:{
		logDir: './logs',
		logFile: '/access.log'
	},

	secure:{
		ignore: [
			'/users/auth',
			'/users/register',
			'/fridges/register'
		]
	},

	ssl:{
		https: true,
		keySrc: './sslcert/server.key',
		publicKeySrc: './sslcert/server.pub',
		certSrc: './sslcert/server.crt',
		format: 'utf8'
	},

	userAuth:{
		privateKeySrc: './sslcert/server.key',
		publicKeySrc: './sslcert/server.pub'
	},

	mongoDB:{
		string: 'mongodb://localhost/CS413'
	},

	favicon: {
		src: 'public/favicon.ico'
	}
};


module.exports = config;