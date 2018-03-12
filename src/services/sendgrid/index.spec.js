const tape = require('tape');
const sendMail = require('.');
const { emailNotifications } = require('../../config');

// TODO: How to handle env variables like this?
tape.test('SendGrid', async (t) => {
	if (!emailNotifications) {
		const response = await sendMail({
			to: 'test@example.com',
			subject: 'Test',
			content: '<h1>Just Testing</h1>',
		});
		console.log(response);
		t.ok(response === 'pino', 'Emails logged with pino in current env');
		return t.end();
	}
	const response = await sendMail({
		to: 'test@example.com',
		subject: 'Test',
		content: '<h1>Just Testing</h1>',
	});
	t.ok(response[0].statusCode === 202, 'Sends test email');
	t.end();
});
