const express = require('express');
const pino = require('pino')();
const bodyParser = require('body-parser');
const querymen = require('querymen');
const bodymen = require('bodymen');
const config = require('../../config');
const cors = require('cors');
const cookieParser = require('cookie-parser');

module.exports = (routes) => {
	const app = express();
	app.use(cookieParser());

	/* istanbul ignore next */
	if (config.env === 'production' || config.env === 'development') {
		app.use((req, res, next) => {
			const start = Date.now();
			req.on('end', () =>
				pino.info(
					'%s: %s %d ms %s',
					req.method,
					req.path,
					Date.now() - start,
					res.statusCode,
				));
			next();
		});
	}

	if (config.env === 'development') {
		app.use(cors({ credentials: true, origin: true }));
	}

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(routes);
	app.use(querymen.errorHandler());
	app.use(bodymen.errorHandler());

	return app;
};
