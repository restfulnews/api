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
 * @api {post} /key Create Key
 * @apiName CreateEntity
 * @apiGroup Key
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Key Key's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Key not found.
 * @apiError 401 user access only.
 */
router.post(
	'/',
	token({ required: true }),
	create,
);

/**
 * @api {get} /key Retrieve key
 * @apiName RetrieveEntity
 * @apiGroup Key
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} key List of key.
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
 * @api {get} /key/:id Retrieve Key
 * @apiName RetrieveEntity
 * @apiGroup Key
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Key Key's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Key not found.
 * @apiError 401 user access only.
 */
router.get(
	'/:id',
	token({ required: true }),
	show,
);

/**
 * @api {put} /key/:id Update Key
 * @apiName UpdateEntity
 * @apiGroup Key
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Key Key's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Key not found.
 * @apiError 401 user access only.
 */
router.put(
	'/:id',
	token({ required: true }),
	update,
);

/**
 * @api {delete} /key/:id Delete Key
 * @apiName DeleteEntity
 * @apiGroup Key
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Key not found.
 * @apiError 401 admin access only.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
