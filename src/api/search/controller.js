const { asyncHandler, removeEmptyParams } = require('../../utils');
const Searcher = require('../../services/searcher');
const { responseWrapper } = require('../../services/response');

/**
* CUSTOM FUNCTIONS
*/

exports.search = asyncHandler(async ({ query, user }, res) => {
	const cleanQuery = removeEmptyParams(query);
	const results = await Searcher(cleanQuery, user);
	res.json(responseWrapper(results));
}, 'Unable to retrieve news articles.');
