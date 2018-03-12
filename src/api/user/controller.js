const notifier = require('../../services/notifier');
const _ = require('lodash');
const pino = require('pino')();
const { success, notFound } = require('../../services/response/');
const {
	APIError, asyncHandler,
	getShortCode, ErrorsArray,
} = require('../../utils');
const User = require('./model');
const sendMail = require('../../services/sendgrid');
const templates = require('../../services/templates');
const isEmail = require('validator/lib/isEmail');
const zxcvbn = require('zxcvbn');

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	User.find(query, select, cursor)
		.then(users => users.map(user => user.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	User.findById(params.id)
		.then(notFound(res))
		.then(user => (user ? user.view() : null))
		.then(success(res))
		.catch(next);

exports.showMe = ({ user }, res) =>
	res.json(user.view(true));

exports.create = asyncHandler(async (req, res, next) => {
	// Server side password check
	// zxcvbn is 1mb and may not always load in time on the client
	const { body } = req;
	const errors = new ErrorsArray();
	const zxcvbnResult = zxcvbn(body.password, [body.email, body.name]);
	if (zxcvbnResult.score < 1) errors.add('password.insecure', 'password', 'The password you\'ve chosen is too insecure.');
	if (body.password.length < 8) errors.add('password.tooShort', 'password');
	if (typeof body.email === 'string' && !isEmail(body.email)) errors.add('invalidEmail', 'email', 'The email you\'ve chosen is invalid.');
	if (errors.length > 0) throw new APIError(400, errors);
	await User.create(body)
		.catch((err) => {
			if (err.name === 'MongoError' && err.code === 11000) {
				errors.add('auth.alreadyExists', 'email');
				throw new APIError(409, errors);
			}
			throw new APIError(500, 'Error creating user', err);
		});
	notifier(
		`${body.name} has signed up.`,
		{
			subject: `${body.name} has signed up.`,
			body: `A new user has signed up.
			<br><b>Full Name</b>: ${body.name}
			<br><b>Email</b>: ${body.email}`,
		},
	);
	// Return JWT in next middleware
	return next();
}, 'Error creating new user');

exports.update = ({ body, params, user }, res, next) =>
	User.findById(params.id === 'me' ? user.id : params.id)
		.then(notFound(res))
		.then((result) => {
			if (!result) return null;
			const isAdmin = user.role === 'admin';
			const isSelfUpdate = user.id === result.id;
			if (!isSelfUpdate && !isAdmin) {
				return next(new APIError(401));
			}
			return result;
		})
		// TODO: Don't shadow vars
		.then(user => (user ? _.merge(user, body).save() : null))
		.then(user => (user ? user.view(true) : null))
		.then(success(res))
		.catch(next);

exports.updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
	User.findById(params.id === 'me' ? user.id : params.id)
		.then(notFound(res))
		.then((result) => {
			if (!result) return null;
			const isSelfUpdate = user.id === result.id;
			if (!isSelfUpdate) {
				return next(new APIError(
					401, {
						valid: false,
						message: 'Invalid credentials',
					},
					'Attempt was made to change another user\'s password',
				));
			}
			return result;
		})
		// TODO: Don't shadow vars
		.then(user => (user ? user.set({ password: body.password }).save() : null))
		.then(user => (user ? user.view(true) : null))
		.then(success(res))
		.catch(next);

function setPasswordResetToken(email) {
	return User.findOneAndUpdate(
		{ email },
		{ $set: { passwordResetCode: getShortCode() } },
		{ new: true },
	);
}
exports.setPasswordResetToken = setPasswordResetToken;
function sendPasswordResetEmail(user) {
	const content = templates['password-reset-code']({ user });
	// Send email
	sendMail({ to: user.email, subject: 'Password Reset', content })
		.then(() => pino.info(`Password reset email mailed to ${user.email}`))
		.catch((err) => {
			pino.warn(`Mailer failed to post password reset email to ${user.email}`);
			pino.warn(err);
		});
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;

exports.getResetPasswordMiddleware = asyncHandler(async (req, res, next) => {
	const { email } = req.body;
	if (typeof email !== 'string' || !email.length) {
		throw new APIError(400, new ErrorsArray('email.required', 'email'));
	}
	if (!isEmail(email)) {
		throw new APIError(400, new ErrorsArray('email.invalid', 'email'));
	}
	// Find user
	const user = await User.findOne({ email });
	if (!user) {
		pino.info('Attempt was made to get password reset code of non-existent account');
		throw new APIError(400, new ErrorsArray('email.nonExistent', 'email'));
	}
	// Found user
	const updatedUser = await setPasswordResetToken(email);
	sendPasswordResetEmail(updatedUser);
	res.status(200).end();
});

exports.updatePasswordWithToken = asyncHandler(async ({ body: { email, code, password } }, res, next) => {
	// TODO: set limit for token use to 5
	// TODO: Make errors tool to reduce and reuse this code
	if (typeof email !== 'string' || !email.length) {
		throw new APIError(400, new ErrorsArray('email.required', 'email'));
	}
	if (!isEmail(email)) {
		throw new APIError(400, new ErrorsArray('email.invalid', 'email'));
	}
	if (!code) throw new APIError(400, { path: 'code', humanError: 'No code provided.' });
	const user = await User.findOne({ email });
	if (!user) {
		pino.info('Attempt was made to reset password of non-existent account');
		throw new APIError(400, new ErrorsArray('email.nonExistent', 'email'));
	}
	if (!user.passwordResetCode) {
		throw new APIError(400, new ErrorsArray('expiredCode', 'code', 'Expired password recovery code'));
	}
	if (user.passwordResetCode !== code) {
		throw new APIError(400, new ErrorsArray('incorrectCode', 'code', 'Incorrect password recovery code'));
	}
	const errors = new ErrorsArray();
	const zxcvbnResult = zxcvbn(password, [email]);
	if (zxcvbnResult.score < 1) errors.add('password.insecure', 'password', 'The password you\'ve chosen is too insecure.');
	if (password.length < 8) errors.add('password.tooShort', 'password');
	if (errors.length > 0) throw new APIError(400, errors);
	await User.update({ email }, { $set: { password, passwordResetCode: null } });
	res.status(202).json('success');
	sendMail({
		to: user.email,
		subject: 'Your password has been reset',
		content: 'Your password has been reset. If this wasn’t initiated by you, please contact us at enquires@restful-api.',
	});
});

// Email check
exports.findUserByEmailPublic = (req, res, next) => {
	const { email } = req.body;
	if (typeof email !== 'string' || !email.length) {
		throw new APIError(400, new ErrorsArray('email.nonExistent', 'email'));
	}
	if (!isEmail(email)) {
		throw new APIError(400, new ErrorsArray('email.invalid', 'email'));
	}
	return User.findOne({ email })
		.then((userData) => {
			if (userData && !userData.password) {
				setPasswordResetToken(email)
					.then(user => sendPasswordResetEmail(user));
				return success(res, 200)({ exists: true, requiresPasswordReset: true });
			}
			return res.json({ exists: !!userData, requiresPasswordReset: false });
		})
		.catch(next);
};

const addUnsetProps = (object, additionalProps) => {
	Object.keys(additionalProps).forEach((key) => {
		if (!object[key]) object[key] = additionalProps[key];
	});
};

exports.findOrCreateGoogle = async (userData) => {
	const {
		googleId, email,
	} = userData;
	// Attempt match via ID first
	const userById = await User.findOne({ googleId });
	if (userById) {
		// TODO: Don't save on every authentication
		addUnsetProps(userById, userData);
		const updatedUser = await userById.save();
		return updatedUser;
	}
	// Attempt match on email
	if (isEmail(email)) {
		const userByEmail = await User.findOne({ email });
		if (userByEmail) {
			addUnsetProps(userByEmail, userData);
			const updatedUser = await userByEmail.save();
			return updatedUser;
		}
	}
	// No ID || Email
	const newUser = await User.create(userData);
	notifier(`${userData.name} has signed up via Google`);
	return newUser;
};

exports.destroy = ({ params }, res, next) =>
	User.findById(params.id)
		.then(notFound(res))
		.then(user => (user ? user.remove() : null))
		.then(success(res, 204))
		.catch(next);
