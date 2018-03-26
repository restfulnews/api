const Guardian = require('guardian-js');
const fecha = require('fecha');
const { guardianKey } = require('../../config');
const { abstract, fingerprint } = require('./helper');

/**
 * Guardian Sourcer - http://open-platform.theguardian.com
 * Please structure the news object to compliment our universal news model.
 * (ie. src/api/news/model.js)
 */

const index = async ({
	topics,
	/* Defaults parameters:
	 * start_date = today - 5years
	 * end_date = today
	 */
	start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString(),
	end_date = new Date().toISOString(),
}) => {
	let allResults = [];

	const apiParams = {
		showFields: ['body', 'thumbnail'],
		orderBy: 'relevance',
		fromDate: start_date,
		toDate: end_date,
	};

	const api = new Guardian(guardianKey, false);

	await api.content.search(topics, apiParams)
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
				thumbnail: result.fields.thumbnail,
				source: 'guardian',
			}));
		});

	return allResults;
};

module.exports = index;
