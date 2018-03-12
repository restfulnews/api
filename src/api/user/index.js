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
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
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
 * @apiPermission public
 * @apiSuccess {Object} exists: true
 */
router.post(
	'/email',
	findUserByEmailPublic,
);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
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
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get(
	'/:id',
	show,
);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
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
 * @apiGroup PasswordReset
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
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
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
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
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
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

/**
 * @api {get} /users/reset-code Send email
 * @apiName SendPasswordReset
 * @apiGroup PasswordReset
 * @apiParam {Object} email Email address to receive the password reset token.
 * @apiSuccess (Success 202) 202 Accepted.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post(
	'/reset-code',
	getResetPasswordMiddleware,
);

module.exports = router;
