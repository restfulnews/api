const {
	guardian,
} = require('../sourcer');

/**
 * Searcher:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

const searcher = (async (keyword, user, next) => {
	guardian(keyword, response => next(response));
});

module.exports = searcher;
