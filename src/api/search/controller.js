const { asyncHandler, removeEmptyParams } = require('../../utils');
const Searcher = require('../../services/searcher');
const { responseWrapper } = require('../../services/response');
const ComapnySearcher = require('../../services/companysearcher');

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
	if (!cleanQuery.companyids) warnings.push('Company id\'s not specified.');
	if (!cleanQuery.page || cleanQuery.page <= 0) cleanQuery.page = 1;

	const comps = cleanQuery.companyids.split(',');

	async function getCompanies(companies) {
		const pArray = companies.map(async (company) => {
			// make it lower case and strip whitespace
			const companyStr = company.toLowerCase().replace(/^\s+|\s+$/g, '');
			let response = '';
			if (companyStr.includes('.ax')) {
				// take the part before ax
				response = await ComapnySearcher(companyStr.split('.')[0]);
			} else {
				response = company;
			}
			return response;
		});
		const users = await Promise.all(pArray);
		return users;
	}
	const newcomps = await getCompanies(comps);
	cleanQuery.companyids = newcomps.join(',');

	try {
		console.log(cleanQuery);
		results = await Searcher(cleanQuery, user);
	} catch (err) {
		warnings.push(err);
	}
	res.json(responseWrapper(results, warnings, startTime, cleanQuery));
}, 'Unable to retrieve news articles.');
