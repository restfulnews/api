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
 * @api {post} /entity Create Entity
 * @apiName CreateEntity
 * @apiGroup Entity
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Entity Entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Entity not found.
 * @apiError 401 user access only.
 */
router.post(
	'/',
	token({ required: true }),
	create,
);

/**
 * @api {get} /entity Retrieve entity
 * @apiName RetrieveEntity
 * @apiGroup Entity
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} entity List of entity.
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
 * @api {get} /entity/:id Retrieve Entity
 * @apiName RetrieveEntity
 * @apiGroup Entity
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Entity Entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Entity not found.
 * @apiError 401 user access only.
 */
router.get(
	'/:id',
	token({ required: true }),
	show,
);

/**
 * @api {put} /entity/:id Update Entity
 * @apiName UpdateEntity
 * @apiGroup Entity
 * @apiPerEntity user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} Entity Entity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Entity not found.
 * @apiError 401 user access only.
 */
router.put(
	'/:id',
	token({ required: true }),
	update,
);

/**
 * @api {delete} /entity/:id Delete Entity
 * @apiName DeleteEntity
 * @apiGroup Entity
 * @apiPerEntity admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Entity not found.
 * @apiError 401 admin access only.
 */
router.delete(
	'/:id',
	token({ required: true, roles: ['admin'] }),
	destroy,
);

module.exports = router;
