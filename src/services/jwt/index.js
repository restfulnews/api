const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

const sign = (id, opts, secret = jwtSecret) =>
	jwt.sign({ id }, secret, opts);

const verify = (token, secret = jwtSecret) =>
	jwt.verify(token, secret);

module.exports = {
	sign,
	verify,
};
