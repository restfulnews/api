const { Router } = require('express');
const { middleware: query } = require('querymen');
const { token } = require('../../services/passport');
const {
	create, index, show, update, destroy,
	search,
} = require('./controller');

const router = new Router();

/**
 * CUSTOM ROUTES
 */

/**
 * @api {get} /news Search for news articles
 * @apiName SearchNews
 * @apiGroup News
 * @apiPerNews user
 * @apiParam {String} topics News topics split by a comma(,).
 * @apiParam {Date.toISOString} start_date Pulished date interval start. (format: YYYY-MM-DDTHH:mm:ss.sssZ)
 * @apiParam {Date.toISOString} end_date Pulished date interval end. (format: YYYY-MM-DDTHH:mm:ss.sssZ)
 * @apiParam {String} BearerToken user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} news List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get(
	'/search',
	token({ required: true }),
	search,
);

/**
	* GENERIC ROUTES (do not modify these)
	*/

/**
 * @api {post} /news Create News
 * @apiName CreateNews
 * @apiGroup News
 * @apiPerNews user
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
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiPerNews admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} news List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get(
	'/',
	token({ required: true }),
	query({ limit: { max: 500 } }),
	index,
);

/**
 * @api {get} /news/:id Retrieve News
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiPerNews user
 * @apiParam {String} BearerToken user access token.
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
 * @apiName UpdateNews
 * @apiGroup News
 * @apiPerNews user
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
 * @apiName DeleteNews
 * @apiGroup News
 * @apiPerNews admin
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
