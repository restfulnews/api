const md5 = require('md5');

const abstract = (text) => {
	const size = 256;
	let summary = text.replace(/<(?:.|\n)*?>/gm, '');
	if (summary.length > size) summary = `${summary.substring(0, size)} ...`;
	return summary;
};

const fingerprint = (title, source) => {
	const hash = md5(`${title}${source}`);
	return hash;
};

module.exports = { abstract, fingerprint };
