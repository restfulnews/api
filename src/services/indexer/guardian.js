const { guardianKey } = require('../../config');
const Guardian = require('guardian-js');
const md5 = require('md5');

/**
 * RESTful New's Standard News Object
 * ModelRef: News
 * Please structure the news object based on the ModelRef.
 */

const guardian = (keyword, next) => {
	const api = new Guardian(guardianKey, false);
	api.content.search(keyword, {
		showFields: ['body', 'thumbnail'],
	})
		.then(async (response) => {
			const responseObject = JSON.parse(response.body);
			const { results } = responseObject.response;
			const processedResults = await results.map(result => ({
				title: result.webTitle,
				fingerprint: md5(`${result.webTitle}-guardian`),
				url: result.webUrl,
				abstract: result.fields.body.replace(/<(?:.|\n)*?>/gm, ''),
				image: result.fields.thumbnail,
			}));
			next(processedResults);
		})
		.catch(error => next(null));
};

module.exports = guardian;
