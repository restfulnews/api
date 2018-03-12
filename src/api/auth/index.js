const { Router } = require('express');
const { login, sendResetLinkIfRequired } = require('./controller');
const {
	json, basic, google,
} = require('../../services/passport');

const router = new Router();

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post(
	'/',
	sendResetLinkIfRequired,
	json(),
	login,
);

router.post(
	'/basic',
	basic(),
	login,
);

/**
 * @api {post} /auth/google Authenticate with Google
 * @apiName AuthenticateGoogle
 * @apiGroup Auth
 * @apiParam {String} access_token Google user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post(
	'/google',
	google,
	login,
);

module.exports = router;
