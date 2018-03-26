const { guardianKey } = require('../../config');
const Guardian = require('guardian-js');
const md5 = require('md5');

/**
 * Guardian Sourcer - http://open-platform.theguardian.com
 * Please structure the news object to compliment our universal news model.
 * (ie. src/api/news/model.js)
 */

const index = (keyword, next) => {
	const api = new Guardian(guardianKey, false);
	api.content.search(keyword, {
		showFields: ['body', 'thumbnail'],
	})
		.then(async (response) => {
			const responseObject = JSON.parse(response.body);
			const { results } = responseObject.response;
			// restructure news list results since to conform with our News Model
			const processedResults = await results.map(result => ({
				title: result.webTitle,
				fingerprint: md5(`${result.webTitle}-guardian`),
				url: result.webUrl,
				abstract: result.fields.body.replace(/<(?:.|\n)*?>/gm, ''),
				thumbnail: result.fields.thumbnail,
				source: 'guardian',
			}));
			next(processedResults);
		})
		.catch(error => next(null));
};

module.exports = index;
