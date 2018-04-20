const request = require('axios');

const url = 'https://www.asx.com.au/asx/research/ASXListedCompanies.csv';

// const final = {};

// function foo(url, callback) {
// 		request.get(url, function (err, response, body) {
// 				return callback(body);
// 		});
// 	}
//
// foo('https://www.asx.com.au/asx/research/ASXListedCompanies.csv',
// function(body){
// 		var dict = {};
// 		//console.log(body);
// 		vals = body.split('\n');
// 		for (var i = 0; i < vals.length; i++) {
// 				// Iterate over numeric indexes from 0 to 5, as everyone expects.
// 				line = vals[i]
// 				words = line.split(',')
// 				if (words.length > 2) {
// 						//create the new company stuff here
// 						dict[words[1]] = [words[0],words[2]]
// 				}
// 		}
// 		//console.log(dict);
// 		final = dict;
// });

async function makedict(vals) {
	const dict = {};
	let i = 0;
	for (i = 0; i < vals.length; i += 1) {
		// Iterate over numeric indexes from 0 to 5, as everyone expects.
		const line = vals[i].replace(/"/g, '');
		const words = line.split(',');
		if (words.length > 2) {
			//create the new company stuff here
			dict[words[1]] = [words[0], words[2]];
		}
	}
	return dict;
}

const index = async () => {
	let dict = {};
	await request.get(url)
		.then(async (body) => {
			const vals = await body.data.split('\n');
			dict = await makedict(vals);

		});
    //console.log(dict);

	return dict;
};

module.exports = index;
