const { permidKey } = require('../../config');
const permid = require('./permid');

const index = async (companyIds, user) => {
	const results = companyIds.map(async id => permid(id, permidKey));
	return Promise.all(results);
};

module.exports = index;
