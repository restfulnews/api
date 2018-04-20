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
	* GENERIC ROUTES (do not modify these)
	*/

/**
 * @api {post} /news Create News
 * @apiName CreateNews
 * @apiGroup News
 * @apiDescription Creates a News object.
 * @apiParam {String} title Title of the news article.
 * @apiParam {String} abstract Abstract of the news article.
 * @apiParam {String} [url] URL to the news article.
 * @apiParam {String} [source] URL Source to the news article.
 * @apiParam {String} [thumbnail] URL Source to the news article thumbnail.
 * @apiParam {Date.toISOString} [publishedAt] Pulished date of the news article. (format: YYYY-MM-DDTHH:mm:ss.sssZ)
 * @apiPerNews admin
 * @apiHeader {String} Bearer user access token.
 * @apiSuccess {Object} News News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 * @apiExample {curl} Curl Usage:
 * curl --request POST \
 * --url http://api.restfulnews.com/news \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 * --data '{"title": "<title>", "publishedAt": "<published at date>", \
 *  "fingerprint": "<fingerprint id>", "url": "<url>", "abstract": "<abstract>", \
 *  "thumbnail": "<thumbnail link>", "source": "<source>"}'
 *
 * {
 *  "id": "<news article id>",
 *  "createdAt": "<created at date>",
 *  "updatedAt": "<updated at date>",
 *  "url": "<url>",
 *  "title": "<title>",
 *  "source": "<source>",
 *  "abstract": "<abstract>",
 *  "thumbnail": "<thumbnail link>"
 * }
 */
router.post(
	'/',
	token({ required: true, roles: ['admin'] }),
	create,
);

/**
 * @api {get} /news Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiDescription Retrieves a list of News objects.
 * @apiPerNews admin
 * @apiHeader {String} Bearer admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} news List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/news \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 *
 * [
 *  {
 *   "id": "<news article id>",
 *   "createdAt": "<created at date>",
 *   "updatedAt": "<updated at date>",
 *   "url": "<url>",
 *   "title": "<title>",
 *   "source": "<source>",
 *   "abstract": "<abstract>",
 *   "thumbnail": "<thumbnail link>"
 *  },
 *  ...
 * ]
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
 * @apiDescription Retrieves a News object based on the news article ID entered.
 * @apiPerNews user
 * @apiParam {String} BearerToken user access token.
 * @apiSuccess {Object} News News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/news/<news article id> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 *
 * {
 *  "id": "<news article id>",
 *  "createdAt": "<created at date>",
 *  "updatedAt": "<updated at date>",
 *  "url": "<url>",
 *  "title": "<title>",
 *  "source": "<source>",
 *  "abstract": "<abstract>",
 *  "thumbnail": "<thumbnail link>"
 * }
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
 * @apiDescription Updates an existing News object with new information.
 * @apiParam {String} title Title of the news article.
 * @apiParam {String} abstract Abstract of the news article.
 * @apiParam {String} [url] URL to the news article.
 * @apiParam {String} [source] URL Source to the news article.
 * @apiParam {String} [thumbnail] URL Source to the news article thumbnail.
 * @apiPerNews user
 * @apiHeader {String} Bearer user access token.
 * @apiSuccess {Object} News News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 user access only.
 * @apiExample {curl} Curl Usage:
 * curl --request PUT \
 * --url http://api.restfulnews.com/news/<news article id> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 * --data '{"title":"<title>", "url":"<url", "source":"<source>", \
 * "abstract":"<abstract>", "thumbnail":"<thumbnail>"}'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<news article id>",
 *  "createdAt": "<created at date>",
 *  "updatedAt": "<updated at date>",
 *  "url": "<url>",
 *  "title": "<title>",
 *  "source": "<source>",
 *  "abstract": "<abstract>",
 *  "thumbnail": "<thumbnail link>"
 * }
 */
router.put(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	update,
);

/**
 * @api {delete} /news/:id Delete News
 * @apiName DeleteNews
 * @apiGroup News
 * @apiDescription Deletes an existing News object.
 * @apiPerNews admin
 * @apiHeader {String} Bearer admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 News not found.
 * @apiError 401 admin access only.
 * @apiExample {curl} Curl Usage:
 * curl --request DELETE \
 * --url http://api.restfulnews.com/news/<news article id> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json'
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
