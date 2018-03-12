const sendgridMail = require('@sendgrid/mail');
const { sendgridKey, noReplyEmail, emailNotifications } = require('../../config');
const pino = require('pino')();

sendgridMail.setApiKey(sendgridKey);

module.exports = ({
	from = noReplyEmail,
	to,
	subject,
	content,
	serviceOn = emailNotifications,
}) => {
	const msg = {
		to,
		from,
		subject,
		html: content,
	};
	if (!serviceOn) {
		pino.info('SendGrid mail: ', msg);
		return Promise.resolve('pino');
	}
	return sendgridMail
		.send(msg)
		.catch((err) => {
			pino.info(err);
		});
};
