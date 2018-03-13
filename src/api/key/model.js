const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const keySchema = new mongoose.Schema({
	secret: String,
	user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

keySchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			user: this.user,
			secret: this.secret,
		};
		return full ? {
			// full view += simple view
			...view,
		} : view;
	},
};

const Key = mongoose.model('Key', keySchema);

module.exports = Key;
