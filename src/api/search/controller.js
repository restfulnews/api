const { asyncHandler, removeEmptyParams } = require('../../utils');
const Searcher = require('../../services/searcher');
const { responseWrapper } = require('../../services/response');
const { getCompanies } = require('../../services/company');

/**
* CUSTOM FUNCTIONS
*/

exports.search = asyncHandler(async ({ query, user }, res) => {
	let results = [];
	const warnings = [];
	const startTime = new Date();
	const cleanQuery = removeEmptyParams(query);
	if (!cleanQuery.start_date) {
		const fiveYearsFromNow = new Date().setFullYear(new Date().getFullYear() - 5);
		cleanQuery.start_date = new Date(fiveYearsFromNow).toISOString();
		warnings.push('Start time not specified.');
	}
	if (!cleanQuery.end_date) {
		cleanQuery.end_date = new Date().toISOString();
		warnings.push('End time not specified.');
	}
	if (!cleanQuery.limit) {
		cleanQuery.limit = 50;
		warnings.push('Limit not set, defaulting to limit to 50 articles.');
	}
	if (cleanQuery.end_date < cleanQuery.start_date) warnings.push('End date cannot be before start date.');
	if (!cleanQuery.topics) warnings.push('Topics not specified.');
	if (!cleanQuery.page || cleanQuery.page <= 0) cleanQuery.page = 1;
	if (!cleanQuery.companyids) {
		warnings.push('Company id\'s not specified.');
	} else {
		// TODO: Fix / rethink company integration
		// Disable company integration for now
		// const comps = cleanQuery.companyids.split(',');
		// const newcomps = await getCompanies(comps);
		// cleanQuery.companyids = newcomps.join(',');
	}
	try {
		results = await Searcher(cleanQuery, user);
	} catch (err) {
		warnings.push(err);
	}
	res.json(responseWrapper(results, warnings, startTime, cleanQuery));
}, 'Unable to retrieve news articles.');
