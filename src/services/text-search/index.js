const querymen = require('querymen');

const schema = new querymen.Schema();
schema.param('text', null, { type: String });
schema.parser('elemMatch', (elemMatch, value) =>
	({ $text: { $search: value } }));
schema.param('text').option('elemMatch', 'prop');

module.exports = schema;
