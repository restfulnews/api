const {
	guardian,
} = require('../sourcer');

/**
 * Indexer:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

const indexer = (async (keyword, next) => {
	guardian(keyword, response => next(response));
});

module.exports = indexer;
