const { guardianKey, nytKey, ftKey } = require('../../config');
const {
	guardian,
	nyt,
	ft,
} = require('../sourcer');

/**
 * Searcher:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

const index = async (query, companies, user) => {
	let results = [];
	results = results.concat(await ft(query, ftKey));
	results = results.concat(await guardian(query, guardianKey));
	results = results.concat(await nyt(query, nytKey));
	const firstArticle = (parseInt(query.page, 10) - 1) * parseInt(query.limit, 10);
	const lastArticle = firstArticle + parseInt(query.limit, 10);
	return results.slice(firstArticle, lastArticle);
};

module.exports = index;
