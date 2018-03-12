/* eslint-disable no-unused-vars */
const path = require('path');
const _ = require('lodash');
const dotenv = require('dotenv-safe');
const pino = require('pino')();

/* istanbul ignore next */
const requireProcessEnv = (name) => {
	if (!process.env[name]) {
		pino.error(`${name} environment variable unset!`);
	}
	return process.env[name] || undefined;
};

/* istanbul ignore next */
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	dotenv.load({
		path: path.join(__dirname, '../.env'),
		sample: path.join(__dirname, '../.env.example'),
	});
}

const baseConfig = {
	uri: process.env.API_URI,
	appUri: process.env.APP_URI,
	version: '1.2.0',
	debug: !!Number(process.env.DEBUG),
	env: process.env.NODE_ENV,
	root: path.join(__dirname, '..'),
	port: process.env.PORT || 9000,
	ip: process.env.IP || '0.0.0.0',
	noReplyEmail: 'noreply@cropian.com',
	enquiriesEmail: 'enquiries@cropian.com',
	adminEmail: 'admin@cropian.com',
	notificationEmail: process.env.NOTIFICATION_EMAIL,
	emailNotifications: !!Number(process.env.EMAIL_NOTIFICATIONS),
	slackNotifications: !!Number(process.env.SLACK_NOTIFICATIONS),
	sendgridKey: requireProcessEnv('SENDGRID_KEY'),
	masterKey: requireProcessEnv('MASTER_KEY'),
	jwtSecret: requireProcessEnv('JWT_SECRET'),
	googleClientId: requireProcessEnv('GOOGLE_CLIENT_ID'),
	googleClientSecret: requireProcessEnv('GOOGLE_CLIENT_SECRET'),
	slackWebhookUrl: 'https://hooks.slack.com/services/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',
	mongo: {
		options: {
			db: {
				safe: true,
			},
		},
	},
};

const developmentConfig = {
	mongo: {
		uri: `mongodb://localhost/${process.env.MONGO_DB_NAME}`,
		options: {
			debug: true,
		},
	},
};

const productionConfig = {
	ip: process.env.IP || undefined,
	port: 8000,
	noReplyEmail: 'noreply@cropian.com',
	enquiriesEmail: 'enquiries@cropian.com',
	adminEmail: 'admin@cropian.com',
	mongo: {
		uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTS}/${process.env.MONGO_DB_NAME}?ssl=true&replicaSet=${process.env.MONGO_CLUSTER_NAME}&authSource=admin`,
		options: {
			debug: false,
		},
	},
};

let config;
switch (process.env.NODE_ENV) {
case 'development':
	config = Object.assign({}, baseConfig, developmentConfig);
	break;
case 'test':
	config = Object.assign({}, baseConfig, testConfig);
	break;
default:
	config = Object.assign({}, baseConfig, productionConfig);
	break;
}

module.exports = config;
