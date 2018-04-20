const { asyncHandler, removeEmptyParams } = require('../../utils');
const ComapnySearcher = require('../../services/companysearcher');
// const Company = require('./model');


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.search = asyncHandler(async ({ query }, res) => {
	console.log(query);
	let results = '';
	const warnings = [];
	const cleanQuery = removeEmptyParams(query);
	try {
		results = await ComapnySearcher(cleanQuery.companyid);
	} catch (err) {
		warnings.push(err);
	}
	res.json({ 'companyname': results });
}, 'Unable to retrieve news articles.');
