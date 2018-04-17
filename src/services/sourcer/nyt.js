const axios = require('axios');
const fecha = require('fecha');
const { abstract, fingerprint } = require('./helper');

const index = async ({
	topics,
	companyids,
	start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
	end_date = new Date(),
}, apiKey) => {
	let allResults = [];

	const params = {
		'api-key': apiKey,
		q: topics,
		fq: companyids,
		begin_date: fecha.format(start_date, 'YYYYMMDD'),
		end_date: fecha.format(end_date, 'YYYYMMDD'),
		fl: 'web_url, pub_date, snippet, headline, keywords, multimedia',
	};

	await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', { params })
		.then(async (response) => {
			const results = response.data.response.docs;
			if (!results) return [];
			allResults = await results.map(result => ({
				title: result.headline.main,
				publishedAt: new Date(result.pub_date),
				fingerprint: fingerprint(result.headline.main, 'nyt'),
				url: result.web_url,
				abstract: abstract(result.snippet),
				thumbnail: result.multimedia[0] ? `https://www.nytimes.com/${result.multimedia[0].url}` : '',
				source: 'nyt',
			}));
		});
	return allResults;
};

module.exports = index;
