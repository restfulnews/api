const axios = require('axios');
const fecha = require('fecha');
const { abstract, extract, fingerprint } = require('./helper');

const index = async ({
	topics,
	companyids,
	start_date,
	end_date,
}, apiKey) => {
	let allResults = [];
	const beginDate = fecha.format(new Date(start_date), 'YYYY-MM-DD[T]HH:mm:ss[Z]');
	const finishDate = fecha.format(new Date(end_date), 'YYYY-MM-DD[T]HH:mm:ss[Z]');
	const topicParams = topics ? topics.split(',').map(x => x.replace(/(.+)/, '"$1"')).join(' | ') : '';
	const companyParams = companyids ? companyids.replace(/ /g, ' | ') : '';
	let queryParams = '';
	if (topicParams === '' || companyParams === '') {
		queryParams = `(${topicParams}${companyParams})`;
	} else {
		queryParams = `(${topicParams}) + (${companyParams})`;
	}
	const data = {
		queryString: `${queryParams} lastPublishDateTime:>${beginDate} lastPublishDateTime:<${finishDate}`,
		queryContext: { curations: ['ARTICLES'] },
		resultContext: { maxResults: 50, aspects: ['title', 'lifecycle', 'summary', 'location', 'editorial', 'images', 'metadata'] },
	};
	const options = {
		method: 'POST',
		url: `http://api.ft.com/content/search/v1?apiKey=${apiKey}`,
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	};
	await axios(options)
		.then(async (response) => {
			const { results } = response.data.results[0];
			if (!results) return [];
			allResults = await results.map(result => ({
				title: result.title.title,
				publishedAt: new Date(result.lifecycle.initialPublishDateTime),
				fingerprint: fingerprint(result.title.title, 'ft'),
				url: result.location.uri,
				abstract: abstract(result.summary.excerpt),
				article: extract(result.metadata.organisations, [result.title.title, result.summary.excerpt].join(' ')),
				thumbnail: result.images[0] ? result.images[0].url : '',
				source: 'ft',
			}));
		});
	return allResults;
};

module.exports = index;
