const axios = require('axios');

exports.searchASX = async (query) => {
	let result = '';
	const companycode = query;
	await axios.get('https://www.asx.com.au/asx/research/ASXListedCompanies.csv')
		.then(async (response) => {
			const vals = response.data.split('\n');
			let i = 0;
			for (i = 0; i < vals.length; i += 1) {
				const line = vals[i];
				const words = line.split(',');
				if (words.length > 2) {
					if (words[1].replace(/["]+/g, '').toLowerCase() === companycode.toLowerCase()) {
						result = words[0].replace(/["]+/g, '').toLowerCase().split(' ')[0];
						break;
					}
				}
			}
			if (i >= vals.length) {
				result = companycode;
			}
		});
	return result;
};

exports.getCompanies = async (companies) => {
	const pArray = companies.map(async (company) => {
		// make it lower case and strip whitespace
		const companyStr = company.toLowerCase().replace(/^\s+|\s+$/g, '');
		let response = '';
		if (companyStr.includes('.ax')) {
			// take the part before ax
			response = await searchASX(companyStr.split('.')[0]);
		} else {
			response = company;
		}
		return response;
	});
	const users = await Promise.all(pArray);
	return users;
};
