const Guardian = require('./guardian');

const indexer = (keyword, next) => {
	Guardian(keyword, response => next(response));
};

module.exports = indexer;
