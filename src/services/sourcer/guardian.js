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
	start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString(),
	end_date = new Date().toISOString(),
	limit = 2,
}, apiKey) => {
	let allResults = [];

	const apiParams = {
		showFields: ['body', 'thumbnail'],
		orderBy: 'relevance',
		fromDate: start_date,
		toDate: end_date,
	};

	const keywords = companyids ? `${topics},${companyids}` : topics;

	const api = new Guardian(apiKey, false);

	let i;
	let maxArticles = limit;

	await api.content.search(keywords, apiParams)
		.then(async (response) => {
			const responseObject = JSON.parse(response.body);
			const { results } = responseObject.response;
			if (!results) return [];
			// restructure news list results since to conform with our News Model
			if (results.length < maxArticles) maxArticles = results.length;
			for (i = 0; i < maxArticles; i += 1) {
				allResults[i] = ({
					title: results[i].webTitle,
					publishedAt: new Date(results[i].webPublicationDate),
					fingerprint: fingerprint(results[i].webTitle, 'guardian'),
					url: results[i].webUrl,
					abstract: abstract(results[i].fields.body),
					thumbnail: results[i].fields.thumbnail,
					source: 'guardian',
				});
			}
		});

	return allResults;
};

module.exports = index;
