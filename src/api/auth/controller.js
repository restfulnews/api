const { sign } = require('../../services/jwt');
const { success } = require('../../services/response/');
const { sendPasswordResetEmail, setPasswordResetToken } = require('../user/controller');
const { ErrorsArray } = require('../../utils');
const User = require('../user/model');

exports.login = ({ user }, res) => {
	const token = sign(user.id);
	success(res, 201)({ token, user: user.view(true) });
};

exports.sendResetLinkIfRequired = (req, res, next) => {
	if (!req.body.email) next();
	return User.findOne({ email: req.body.email }, 'password')
		.then((userData) => {
			if (!userData) return next();
			if (!userData.password) {
				setPasswordResetToken(req.body.email)
					.then(user => sendPasswordResetEmail(user));
				return success(res, 400)(new ErrorsArray('password.requiresReset', 'password', 'Account requires password reset to retrieve API credentials.'));
			}
			return next();
		})
		.catch(next);
};
