
var app = require('./app/app')(),
	config = require('./config'),
	fs = require('fs'),
	http = require('http'),
	https = require('https'),
	privateKey  = fs.readFileSync(config.ssl.keySrc, config.ssl.format),
	certificate = fs.readFileSync(config.ssl.certSrc, config.ssl.format);


var path = require('path');
global.appRoot = path.resolve(__dirname) + "/app/";

var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);

//Ensure that Node server can only be accessed internally or via Nginx forward
httpsServer.listen(config.ports.https, '127.0.0.1');
