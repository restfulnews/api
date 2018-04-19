const { asyncHandler, removeEmptyParams } = require('../../utils');
const Searcher = require('../../services/searcher');
const { responseWrapper } = require('../../services/response');
const pino = require('pino')();

/**
* CUSTOM FUNCTIONS
*/

exports.search = asyncHandler(async ({ params, query, user }, res) => {
	const cleanQuery = removeEmptyParams(query);
	if (!cleanQuery.start_date) cleanQuery.start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString();
	if (!cleanQuery.end_date) cleanQuery.end_date = new Date().toISOString();
	if (!cleanQuery.max_results) cleanQuery.max_results = 20;
	if (!cleanQuery.page || cleanQuery.page <= 0) cleanQuery.page = 1;
	//console.log(cleanQuery);
	const results = await Searcher(cleanQuery, user);
	res.json(responseWrapper(results));
}, 'Unable to retrieve news articles.');
