const { Router } = require('express');
const { middleware: query } = require('querymen');
const { middleware: body } = require('bodymen');
const { token } = require('../../services/passport');
const {
	index, showMe, show,
	create, update, updatePassword,
	destroy, findUserByEmailPublic,
	getResetPasswordMiddleware,
	updatePasswordWithToken,
} = require('./controller');
const User = require('./model');
const { json } = require('../../services/passport');
const { login } = require('../auth/controller');

const router = new Router();
const {
	email, password,
	passwordResetCode: code,
} = User.schema.tree;

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiDescription Gets a list of all users.
 * @apiPermission admin
 * @apiHeader {String} Bearer User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/users \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * [
 *  {
 *    "id": "<user id>",
 *    "name": "<name>",
 *    "picture": "<picture>",
 *    "role": "<role>",
 *    "email": "<email>",
 *    "createdAt": "<created at date>"
 *  },
 *  ...
 * ]
 */
router.get(
	'/',
	token({ required: true, roles: ['admin'] }),
	query(Object.assign({}, { limit: { max: 500 } })),
	index,
);

/**
 * @api {post} /email/:email Test if user exists
 * @apiName FindUserByEmailPublic
 * @apiGroup User
 * @apiDescription Checks if a user exists with the specified email.
 * @apiPermission public
 * @apiSuccess {Object} exists: true
 * @apiExample {curl} Curl Usage:
 * curl --request POST \
 * --url http://api.restfulnews.com/users/<email> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 */
router.post(
	'/email',
	findUserByEmailPublic,
);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiDescription Gets the current user who is logged in.
 * @apiPermission user
 * @apiHeader {String} Bearer User access_token.
 * @apiSuccess {Object} user User's data.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/users/me \
 * --header 'authorization: Bearer <Bearer Token>' \
 * --header 'content-type: application/json'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id":"<user id>",
 *  "name":"<name>",
 *  "picture":"<picture link>",
 *  "role":"<role>",
 *  "email":"<email>",
 *  "createdAt":"<created at date>"
 * }
 */
router.get(
	'/me',
	token({ required: true }),
	showMe,
);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiDescription Retrieves a user's data when given the User ID.
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 * @apiExample {curl} Curl Usage:
 * curl --request GET --url http://api.restfulnews.com/users/<user id> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<user id>",
 *  "name": "<name>",
 *  "picture": "<picture link>",
 *  "role": "<role>"
 * }
 */
router.get(
	'/:id',
	show,
);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiDescription Creates a user with the information provided in the parameters.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} name User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's role.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 409 Email already registered.
 * @apiExample {curl} Curl Usage:
 * curl --request POST --url http://api.restfulnews.com/users \
 * --header 'content-type: application/json' \
 * --data '{ "email": "<email>", "password": "<password>", \
 * "name": "<name>", "picture": "<picture link>"}'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "token": <"bearer token">,
 *  "user":
 *  {
 *    "id": "<user id>",
 *    "name": "<name>",
 *    "picture": "<picture link>",
 *    "role": "<role>",
 *    "email": "<email>",
 *    "createdAt" : "<created at date>"
 *  }
 * }
 */
router.post(
	'/',
	create,
	json(),
	login,
);

/**
 * @api {post} /users/password/ Send email
 * @apiName UpdatePasswordWithToken
 * @apiGroup User
 * @apiParam {String} email Email address
 * @apiParam {String} code Code
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.put(
	'/password',
	body({ email, code, password }),
	updatePasswordWithToken,
);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiDescription Updates an existing User's information based on the parameters entered.
 * @apiPermission user
 * @apiHeader {String} Bearer User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 * @apiExample {curl} Curl Usage:
 * curl --request PUT \
 *  --url http://api.restfulnews.com/users/<user_id>/update \
 *  --header 'authorization: Bearer <Bearer Token>' \
 *  --header 'content-type: application/json' \
 *  --data '{"name": "<name>", "picture": "<picture link>"}'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<user id>",
 *  "name": "<name>",
 *  "picture": "<picture link>",
 *  "role": "<role>",
 *  "email": "<email>",
 *  "createdAt": "<created at date>"
 * }
 */
router.put(
	'/:id',
	token({ required: true }),
	update,
);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiDescription Updates an existing User's password.
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 * @apiExample {curl} Curl Usage:
 * curl --request PUT \
 *  --url http://api.restfulnews.com/users/<user_id>/password \
 *  --header 'authorization: Bearer <Bearer Token>' \
 *  --header 'content-type: application/json' \
 *  --data '{"password":"<new password>}'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<user id>",
 *  "name": "<name>",
 *  "picture": "<picture link>",
 *  "role": "<role>",
 *  "email": "<email>",
 *  "createdAt": "<created at date>"
 * }
 */
router.put(
	'/:id/password',
	token({ required: true }),
	body({ password }),
	updatePassword,
);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
  * @apiDescription Deletes an existing user with the specified User ID.
 * @apiPermission admin
 * @apiHeader {String} Bearer User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 * @apiExample {curl} Curl Usage:
 * curl --request DELETE \
 * --url 'http://api.restfulnews.com/users/<user_id>' \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

/**
 * @api {get} /users/reset-code Send email
 * @apiName SendPasswordReset
 * @apiGroup User
 * @apiDescription Sends a password reset code to the specified E-mail address.
 * @apiParam {Object} email Email address to receive the password reset token.
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post(
	'/reset-code',
	getResetPasswordMiddleware,
);

module.exports = router;
