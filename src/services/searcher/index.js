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
	return results;
};

module.exports = index;
