const { Router } = require('express');
const user = require('./user');
const auth = require('./auth');
const config = require('../config');
const debug = require('./debug');
const enquire = require('./enquire');
const entity = require('./entity');
const { errorHandler } = require('../utils');

const router = new Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user);
router.use('/auth', auth);
router.use('/entity', entity);
router.use('/enquire', enquire);
router.use('/debug', debug);
router.get('/', (req, res) =>
	res.status(200).json({
		env: config.env,
		version: config.version,
	}));
// 404 handler
router.all('*', (req, res) =>
	res.status(404).end());
// Error handler
router.use(errorHandler);

module.exports = router;
