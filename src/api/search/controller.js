const { asyncHandler } = require('../../utils');
const Searcher = require('../../services/searcher');

/**
* CUSTOM FUNCTIONS
*/

exports.search = asyncHandler(async ({ query, user }, res) => {
	const results = await Searcher(query, user);
	res.json(results);
}, 'Unable to retrieve news articles.');
