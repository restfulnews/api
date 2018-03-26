const {
	guardian,
} = require('../sourcer');

/**
 * Searcher:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

const index = async (query, user) => {
	let results = [];
	results = results.concat(await guardian(query));
	return results;
};

module.exports = index;
