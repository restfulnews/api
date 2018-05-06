const axios = require('axios');

const index = async (companyId, apiKey) => {
	let result = {};
	const params = {
		'access-token': apiKey,
		q: companyId,
		num: 1,
	};
	await axios.get('https://api.thomsonreuters.com/permid/search', { params })
		.then(async (response) => {
			try {
				result = {
					name: response.data.result.organizations.entities[0].organizationName,
					shortName: response.data.result.organizations.entities[0].organizationName.toLowerCase().split(' ')[0],
					ticker: response.data.result.quotes.entities[0].hasRIC,
					websiteUrl: response.data.result.organizations.entities[0].hasURL,
					permidUrl: response.data.result.quotes.entities[0].isQuoteOf,
				};
			} catch (err) {
				console.log(err);
			}
		});
	return result;
};

module.exports = index;
