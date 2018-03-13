const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const companySchema = new mongoose.Schema({
	name: String
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

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
