const mongoose = require('mongoose');
const mongooseKeywords = require('mongoose-keywords');

const newsSchema = new mongoose.Schema({
	/** fingerprint:
	 * unqiue hash used to distinguish
	 * md5(title-<source>)
	 */
	fingerprint: String,
	title: String, // article title
	abstract: String, // article description
	url: String, // web url to article
	thumbnail: String, // url to article image
}, { timestamps: true });

newsSchema.methods = {
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
			fingerprint: this.fingerprint,
			abstract: this.abstract,
			url: this.url,
			thumbnail: this.thumbnail,
		} : view;
	},
};

newsSchema.plugin(mongooseKeywords, {
	paths: [
		'title',
		'abstract',
	],
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
