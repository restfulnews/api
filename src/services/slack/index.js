const Slack = require('slack-node');
const { slackWebhookUrl } = require('../../config');
const { slackNotifications } = require('../../config');
const pino = require('pino')();

const slack = new Slack();
slack.setWebhook(slackWebhookUrl);

module.exports = (message) => {
	if (!slackNotifications) {
		pino.info('Slack message: ', message);
		return Promise.resolve('pino');
	}
	return new Promise((resolve, reject) =>
		slack.webhook({
			text: message,
		}, (err, response) => {
			if (err) return reject(err);
			return resolve(response);
		}));
};
