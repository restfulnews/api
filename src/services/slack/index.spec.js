const tape = require('tape');
const slack = require('.');
const pino = require('pino')();
const { slackNotifications } = require('../../config');

tape.test('Slack integration', (t) => {
	return slack('Running slack test')
		.then(() => {
			// If Slack is on
			if (!slackNotifications) {
				t.ok(true, 'Slack notifications not running in current environment');
				return t.end();
			}
			// If Slack is off
			t.ok(true, 'Sends slack webhook');
			return t.end();
		})
		.catch((err) => {
			t.ok(false, 'Sends slack webhook');
			pino.error(err);
			t.end();
		});
});
