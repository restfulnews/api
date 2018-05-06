const { asyncHandler, removeEmptyParams } = require('../../utils');
const { responseWrapper } = require('../../services/response');
const searcher = require('../../services/searcher');
const company = require('../../services/company');

async function linkNewsWithCompanies(news, companies) {
	let results = news;
	await results.forEach((result) => {
		companies.forEach((_company) => {
			if (result.article.toLowerCase().indexOf(_company.shortName) >= 0) {
				if (!result.companies) {
					result.companies = [_company];
				} else {
					result.companies.push(_company);
				}
			}
		});
		if (result.article) delete result.article;
	});
	return results;
}

exports.search = asyncHandler(async ({ query, user }, res) => {
	let news = [];
	let companies = [];
	let companyIds = [];
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
		warnings.push('Company Ids not specified.');
	} else {
		companyIds = await cleanQuery.companyids.split(',');
		companies = await company(companyIds, user);
		cleanQuery.companyids = companies.map(c => c.shortName).toString();
	}
	news = await searcher(cleanQuery, user);
	results = await linkNewsWithCompanies(news, companies);
	res.json(responseWrapper(companies, results, warnings, startTime, cleanQuery));
}, 'Unable to retrieve news articles.');
