const mongoose = require('mongoose');
const { mongo } = require('../../config');
const pino = require('pino')();

Object.keys(mongo.options).forEach((key) => {
	mongoose.set(key, mongo.options[key]);
});

mongoose.Promise = global.Promise;
/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function view() {
	return { id: this.toString() };
};

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
	pino.error(`MongoDB connection error: ${err}`);
	process.exit(-1);
});

module.exports = mongoose;
