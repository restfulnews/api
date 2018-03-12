const http = require('http');
const config = require('./config');
const mongoose = require('./services/mongoose');
const express = require('./services/express');
const api = require('./api');
const pino = require('pino')();

const app = express(api);
const server = http.createServer(app);

mongoose.connect(config.mongo.uri, {
	useMongoClient: true,
})
	.then(() => {
		server.listen(config.port, config.ip, () => {
			pino.info(`😎 RESTful API ${config.version} started at http://${config.ip}:${config.port} (${config.env} mode)`);
			// TODO: immediate shutdown if env !== development and debug === true
			if (config.debug) pino.info('CAUTION: RUNNING WITH DEBUG FLAG. API EXPOSED.');
			pino.info(`Slack notifications: ${config.slackNotifications}`);
			pino.info(`Email notifications: ${config.emailNotifications}`);
		});
	});

module.exports = app;
