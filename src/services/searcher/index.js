const { guardianKey, nytKey } = require('../../config');
const {
	guardian,
	nyt,
} = require('../sourcer');

/**
 * Searcher:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

const index = async (query, user) => {
	let results = [];
	results = results.concat(await guardian(query, guardianKey));
	results = results.concat(await nyt(query, nytKey));
	const firstArticle = (parseInt(query.page, 10) - 1) * parseInt(query.limit, 10);
	const lastArticle = firstArticle + parseInt(query.limit, 10);
	return results.slice(firstArticle, lastArticle);
};

module.exports = index;
