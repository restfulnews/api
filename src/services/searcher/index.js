const { guardianKey, nytKey } = require('../../config');
const {
	yahoo,
	guardian,
	nyt,
} = require('../sourcer');

/**
 * Searcher:
 * - compiles results from different news sources into one
 * - saves news objects without duplicate fingerprints into the db
 */

async function convertCID(query, companydict) {
	let myquery = query;
	if (myquery.companyids) {
		let searchterms = '';
		// let i = 0;
		// for (i = 0; i < myquery.companyids.length; i += 1) {
		searchterms += companydict[myquery.companyids][0];
			// searchterms += ' ';
		// }
		myquery.companyids = searchterms;
	}
//	console.log(myquery.companyids)

	return myquery;
}

const index = async (query, user) => {
	// console.log(yahoo())
	const companydict = await yahoo();
	const myquery = await convertCID(query, companydict);
	let results = [];
	results = results.concat(await guardian(myquery, guardianKey));
	results = results.concat(await nyt(myquery, nytKey));
	const firstArticle = (parseInt(myquery.page, 10) - 1) * parseInt(myquery.limit, 10);
	const lastArticle = firstArticle + parseInt(myquery.limit, 10);
	return results.slice(firstArticle, lastArticle);
};

module.exports = index;
