const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const accessSchema = new mongoose.Schema({
	title: String
}, { timestamps: true });

accessSchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			title: this.title,
		};
		return full ? {
			// full view += simple view
			...view,
		} : view;
	},
};

const Access = mongoose.model('Access', accessSchema);

module.exports = Access;
