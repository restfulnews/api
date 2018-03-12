const sendMail = require('../../services/sendgrid');
const sanitize = require('sanitize-html');
const config = require('../../config');
const { APIError } = require('../../utils');
const isEmail = require('validator/lib/isEmail');
const pino = require('pino')();

const sanitizedDefaults = {
	allowedTags: [],
	allowedAttributes: [],
};

exports.enquire = ({ body }, res, next) => {
	const errors = [];
	if (!body.fromEmail) errors.push({ path: 'fromEmail', error: 'notSpecified' });
	if (body.fromEmail && !isEmail(body.fromEmail)) errors.push({ path: 'email', error: 'invalidEmail' });
	if (!body.subject) errors.push({ path: 'subject', error: 'notSpecified' });
	if (!body.body) errors.push({ path: 'body', error: 'noEmailBody' });
	// TODO: further validation, limit content size (can bodymen do this?)
	if (errors.length) throw new APIError(400, errors);
	const sanitizedFromEmail = sanitize(body.fromEmail, sanitizedDefaults);
	const sanitizedBody = sanitize(body.body, sanitizedDefaults);
	const sanitizedSubject = sanitize(body.subject, sanitizedDefaults);
	// Send enquiry
	sendMail({
		to: config.enquiriesEmail,
		subject: `Enquiry: ${sanitizedSubject}`,
		content: `
<p>This email is regarding the following enquiry:</p>
<br><b>Email:</b> ${sanitizedFromEmail}
<br><b>Subject:</b> ${sanitizedSubject}
<br><b>Enquiry:</b> ${sanitizedBody}
<br>Kind Regards`,
	})
		.then(() => {
			pino.info(`Enquiry from ${sanitizedFromEmail} sent to ${config.enquiriesEmail}.`);
			// TODO: Consider non JSON response here (must be handled API side)
			res.status(200).json({ sent: true });
			// Email receipt
			sendMail({
				to: sanitizedFromEmail,
				subject: `Enquiry: ${sanitizedSubject}`,
				content: `
Hi,
<br>
<p>Thanks for getting in touch! We've received your enquiry and a member of our team will get back to you shortly.</p>
<br>We look forward to speaking with you.`,
			})
				.then(() => pino.info(`Enquiry receipt sent to ${sanitizedFromEmail}.`))
				.catch((err => pino.error('Error sending email receipt', err)));
		})
		.catch(next);
};
