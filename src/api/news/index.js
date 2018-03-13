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
 * @api {post} /news Create News
 * @apiName CreateEntity
 * @apiGroup News
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} News News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 */
router.post(
	'/',
	token({ required: true }),
	create,
);

/**
 * @api {get} /news Retrieve news
 * @apiName RetrieveEntity
 * @apiGroup News
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} news List of news.
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
 * @api {get} /news/:id Retrieve News
 * @apiName RetrieveEntity
 * @apiGroup News
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} News News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 */
router.get(
	'/:id',
	token({ required: true }),
	show,
);

/**
 * @api {put} /news/:id Update News
 * @apiName UpdateEntity
 * @apiGroup News
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} News News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 */
router.put(
	'/:id',
	token({ required: true }),
	update,
);

/**
 * @api {delete} /news/:id Delete News
 * @apiName DeleteEntity
 * @apiGroup News
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
