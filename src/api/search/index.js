const { Router } = require('express');
const { token } = require('../../services/passport');
const {
	search,
} = require('./controller');

const router = new Router();

/**
 * CUSTOM ROUTES
 */

/**
 * @api {get} /search Search for news articles (main)
 * @apiName SearchNews
 * @apiGroup Search
 * @apiPerNews user
 * @apiHeader {String} Bearer user access token.
 * @apiParam {String} topics News topics split by a comma(,).
 * @apiParam {Date.toISOString} start_date Pulished date interval start. (format: YYYY-MM-DDTHH:mm:ss.sssZ)
 * @apiParam {Date.toISOString} end_date Pulished date interval end. (format: YYYY-MM-DDTHH:mm:ss.sssZ)
 * @apiSuccess {Object[]} news List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiExample {curl} Curl Usage:
 * curl --request GET \
 * --url http://api.restfulnews.com/search?topics=<topics>&start_date=<iso_time>&end_date=<iso_time> \
 * --header 'authorization: Bearer <bearer token>' \
 * --header 'content-type: application/json' \
 *
 *[
 * {
 *  "title": "<title>",
 *  "publishedAt": "<published at date>",
 *  "fingerprint": "<fingerprint id>",
 *  "url": "<url>",
 *  "abstract": "<abstract>",
 *  "thumbnail": "<thumbnail>",
 *  "source": "<source>"
 * },
 * ...
 * }
 *]
 */
router.get(
	'/',
	token({ required: true }),
	search,
);
