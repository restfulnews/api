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
 * @apiHeader {String} Bearer user access token.
 * @apiSuccess {Object} Company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 * @apiExample {curl} Curl Usage:
 * curl --request POST \
 * --url http://api.restfulnews.com/company \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 * --data '{"name":"<name>", "ticker":"<ticket>", "market":"<market>"}'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<company id>",
 *  "createdAt": "<created at date>",
 *  "updatedAt": "<updated at date>",
 *  "name": "<name>"
 * }
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
 * @apiHeader {String} Bearer admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} company List of company.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/company \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * [
 *  {
 *   "id": "<company id>",
 *   "createdAt": "<created at date>",
 *   "updatedAt": "<updated at date>",
 *   "name": "<name>"
 *  },
 *  {
 *   "id": "<company id>",
 *   "createdAt": "<created at date>",
 *   "updatedAt": "<updated at date>",
 *   "name": "<name>"
 *  }
 * ]
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
 * @apiHeader {String} Bearer user access token.
 * @apiSuccess {Object} Company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/company/<company id> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<company id>",
 *  "createdAt": "<created at date>",
 *  "updatedAt": "<updated at date>",
 *  "name": "<name>"
 * }
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
 * @apiHeader {String} Bearer user access token.
 * @apiSuccess {Object} Company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 user access only.
 * @apiExample {curl} Curl Usage:
 * curl --request PUT \
 * --url http://api.restfulnews.com/company/<company id> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 * --data '{"name":"<name>", "market":"<market>"}'
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 * {
 *  "id": "<company id>",
 *  "createdAt": "<created at date>",
 *  "updatedAt": "<updated at date>",
 *  "name": "<name>"
 * }
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
 * @apiHeader {String} Bearer admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Company not found.
 * @apiError 401 admin access only.
 * @apiExample {curl} Curl Usage:
 * curl --request DELETE \
 * --url http://api.restfulnews.com/company/5abcec87b8329b17e45b3e50 \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 *
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
