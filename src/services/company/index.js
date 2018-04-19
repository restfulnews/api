const googleFinance = require('google-finance');

const checkTickers = async () => {
	const errors = [];
	await googleFinance.companyNews({
		symbol: 'NASDAQ:AAPL',
	}, (err, news) => {
		console.log(news);
	});
	return errors;
};

module.exports = {
	checkTickers,
};
