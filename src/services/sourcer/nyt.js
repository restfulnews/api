const request = require('request');
const Promise = require('bluebird');
const { abstract, fingerprint } = require('./helper');

const get = Promise.promisify(request.get);

const index = async ({
	topics,
	companyids,
	start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString(),
	end_date = new Date().toISOString(),
}, apiKey) => {
	let allResults = [];
	const startDay = new Date(start_date).getDate();
	const endDay = new Date(end_date).getDate();
	const startMonth = new Date(start_date).getMonth() + 1;
	const endMonth = new Date(end_date).getMonth() + 1;
	const startYear = new Date(start_date).getFullYear();
	const endYear = new Date(end_date).getFullYear();

	//we get the dates into the format needed by the query using the slice 

	const startQ = startYear.toString() + ('0' + startMonth.toString()).slice(-2) + ('0' + startDay.toString()).slice(-2);
	const endQ = endYear.toString() + ('0' + endMonth.toString()).slice(-2) + ('0' + endDay.toString()).slice(-2);

	await get({
		url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
		qs: {
			'api-key': "095de935ed764ab4820586be916609b0",
			'q': topics,
			'fq': companyids,
			'begin_date': startQ,
			'end_date': endQ,
			'fl': "web_url, pub_date, snippet, headline, keywords, multimedia"
		},
	}).then(async (response) => {
		const responseObject = JSON.parse(response.body);
		const results = responseObject.response.docs;

		var transformResult = function(item, index) {
			const result = item;
			if (! item.multimedia[0]){
				res = { title: result.headline.main,
					publishedAt: new Date(result.pub_date),
					fingerprint: fingerprint(result.headline.main, 'nyt'),
					url: result.web_url,
					abstract: abstract(result.snippet),
					thumbnail: '',
					source: 'New York Times',
				};
			} else {
				res = {
					title: result.headline.main,
					publishedAt: new Date(result.pub_date),
					fingerprint: fingerprint(result.headline.main, 'nyt'),
					url: result.web_url,
					abstract: abstract(result.snippet),
					thumbnail: 'https://www.nytimes.com/' + result.multimedia[0].url,
					source: 'New York Times',
				};
			}
			return res;
		}


		allResults = await results.map(transformResult);
	});

	return allResults;
};

module.exports = index;
