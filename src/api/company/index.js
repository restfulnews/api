const { Router } = require('express');
const { middleware: query } = require('querymen');
const { token } = require('../../services/passport');
const {
	create, index, show, update, destroy,
} = require('./controller');

const router = new Router();

/**
 * CUSTOM ROUTES
 */


/**
	* GENERIC ROUTES (do not modify these)
	*/

/**
 * @api {post} /company Create Company
 * @apiName CreateEntity
 * @apiGroup Company
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.post(
	'/',
	token({ required: true }),
	create,
);

/**
 * @api {get} /company Retrieve company
 * @apiName RetrieveEntity
 * @apiGroup Company
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} company List of company.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get(
	'/',
	token({ required: true, roles: ['admin'] }),
	query({ limit: { max: 500 } }),
	index,
);

/**
 * @api {get} /company/:id Retrieve Company
 * @apiName RetrieveEntity
 * @apiGroup Company
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.get(
	'/:id',
	token({ required: true }),
	show,
);

/**
 * @api {put} /company/:id Update Company
 * @apiName UpdateEntity
 * @apiGroup Company
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 */
router.put(
	'/:id',
	token({ required: true }),
	update,
);

/**
 * @api {delete} /company/:id Delete Company
 * @apiName DeleteEntity
 * @apiGroup Company
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Company not found.
 * @apiError 401 admin access only.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
