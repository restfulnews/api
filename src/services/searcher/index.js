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
	var first_article = (parseInt(query.page)-1)*parseInt(query.max_results);
	var last_article = first_article + parseInt(query.max_results);
	// console.log(first_article);
	// console.log(last_article);
	return results.slice(first_article, last_article);
};

module.exports = index;
