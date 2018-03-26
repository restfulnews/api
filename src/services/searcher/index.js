const {
	guardian,
} = require('../sourcer');

/**
 * Searcher:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

const searcher = async (query, user) => {
	const results = await guardian(query);
	return results;
};

module.exports = searcher;
