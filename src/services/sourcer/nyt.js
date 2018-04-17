const request = require('request');
const Promise = require('bluebird');

let get = Promise.promisify(request.get);

const index = async ({
	topics,
	companyids,
	start_date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString(),
	end_date = new Date().toISOString(),
}, apiKey) => {
	let allResults = [];

	await get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          'api-key': "095de935ed764ab4820586be916609b0",
          'q': "trump",
          'begin_date': "20180415",
          'end_date': "20180416",
          'sort': "newest",
          'fl': "web_url, snippet, headline, keywords"
        },
      })
		.then(async (response) => {
			const responseObject = JSON.parse(response.body);
			const { results } = responseObject.response;
			if (!results) return [];
			// restructure news list results since to conform with our News Model
			allResults = await results.map(result => ({
				title: result.headline.main,
				publishedAt: new Date(result.pub_date),
				fingerprint: fingerprint(result.headline.main, 'nyt'),
				url: result.web_url,
				abstract: abstract(result.snippet),
				thumbnail: result.headline,
				source: 'New York Times',
			}));
		});

	return allResults;
};



nyt.article.search(args -g, callback)




