const { Router } = require('express');
const { login, sendResetLinkIfRequired } = require('./controller');
const {
	json, basic, google,
} = require('../../services/passport');

const router = new Router();


router.post(
	'/',
	sendResetLinkIfRequired,
	json(),
	login,
);

/**
 * @api {post} /auth/basic Basic Authentication
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiParam {String} email User's Email address
 * @apiParam {String} password User's password
 * @apiSuccess (Success 201) {String} token User Bearer `token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 * @apiExample {curl} Curl Usage:
 * curl http://api.restfulnews.com/auth -XPOST \
 * -H 'Content-Type:application/json' \
 * -d '{"email":"<email>","password":"<password>"}' \
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
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
	'/basic',
	basic(),
	login,
);

/**
 * @api {post} /auth/google Authenticate with Google
 * @apiName AuthenticateGoogle
 * @apiGroup Auth
 * @apiHeader {String} Bearer Google user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 * @apiSampleRequest http://api.restfulnews.com/auth
 * @apiExample {curl} Curl Usage:
 * curl http://api.restfulnews.com/auth -XPOST \
 * -H 'Content-Type:application/json' \
 * -d '{"token":"<Google OAuth Token>"}' \
 * --oauth2-bearer "<bearer token>"
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
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
