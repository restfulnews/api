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
 * @apiExample {curl} Example Usage:
 * curl http://0.0.0.0:9000/auth -XPOST \
 * -H 'Content-Type:application/json' \
 * -d '{"email":"bobsagget@gmail.com","password":"bobsagget"}' \
 * --oauth2-bearer "<bearer token>"
 *
 * {
 *  "token":"<bearer token>",
 *  "user": {
 *    "id":"<user_id token>",
 *    "name":"<name>",
 *    "picture":"<display picture link>",
 *    "role":"<role>",
 *    "email":"<email>",
 *    "createdAt":"<created at date>"
 *  }
 * }
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
 * @apiExample {curl} Example Usage:
 * curl http://0.0.0.0:9000/auth -XPOST \
 * -H 'Content-Type:application/json' \
 * -d '{"token":"<Google OAuth Token>"}' \
 * --oauth2-bearer "<bearer token>"
 *
 * {
 *  "token":"<bearer token>",
 *  "user": {
 *      "id":"<user_id token>",
 *      "name":"<name>",
 *      "picture":"<display picture link>",
 *      "role":"<role>",
 *      "email":"<email>",
 *      "createdAt":"<created at date>"
 *  }
 * }
 */
router.post(
	'/google',
	google,
	login,
);

module.exports = router;
