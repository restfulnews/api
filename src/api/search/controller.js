const { asyncHandler, removeEmptyParams } = require('../../utils');
const Searcher = require('../../services/searcher');
const { responseWrapper } = require('../../services/response');

/**
* CUSTOM FUNCTIONS
*/

exports.search = asyncHandler(async ({ query, user }, res) => {
	const cleanQuery = removeEmptyParams(query);
	if (!cleanQuery.start_date) cleanQuery.start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString();
	if (!cleanQuery.end_date) cleanQuery.end_date = new Date().toISOString();
	const results = await Searcher(cleanQuery, user);
	res.json(responseWrapper(results));
}, 'Unable to retrieve news articles.');
