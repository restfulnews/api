const Guardian = require('guardian-js');
const { abstract, fingerprint } = require('./helper');

/**
 * Guardian Sourcer - http://open-platform.theguardian.com
 * Please structure the news object to compliment our universal news model.
 * (ie. src/api/news/model.js)
 */

const index = async ({
	topics,
	companyids,
	start_date,
	end_date,
}, apiKey) => {
	let allResults = [];

	const params = {
		showFields: ['body', 'thumbnail'],
		orderBy: 'relevance',
		fromDate: start_date,
		toDate: end_date,
	};

	const keywords = companyids ? `${topics},${companyids}` : topics;

	const api = new Guardian(apiKey, false);

	await api.content.search(keywords, params)
		.then(async (response) => {
			const responseObject = JSON.parse(response.body);
			const { results } = responseObject.response;
			if (!results) return [];
			// restructure news list results since to conform with our News Model
			allResults = await results.map(result => ({
				title: result.webTitle,
				publishedAt: new Date(result.webPublicationDate),
				fingerprint: fingerprint(result.webTitle, 'guardian'),
				url: result.webUrl,
				abstract: abstract(result.fields.body),
				article: result.fields.body,
				thumbnail: result.fields.thumbnail,
				source: 'guardian',
			}));
		});
	return allResults;
};

module.exports = index;
