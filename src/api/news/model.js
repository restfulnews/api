const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const entitySchema = new mongoose.Schema({
	title: String
}, { timestamps: true });

entitySchema.methods = {
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

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;
