const mongoose = require('mongoose');
const mongooseKeywords = require('mongoose-keywords');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const companySchema = new mongoose.Schema({
	name: String,
	ticker: String,
	market: String, // Market Index (e.g. ASX, NASDAQ etc)
}, { timestamps: true });

companySchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			name: this.name,
		};
		return full ? {
			// full view += simple view
			...view,
		} : view;
	},
};

companySchema.plugin(mongooseKeywords, { paths: ['name'] });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
