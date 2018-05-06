const mongoose = require('mongoose');
const mongooseKeywords = require('mongoose-keywords');

const newsSchema = new mongoose.Schema({
	/** fingerprint:
	 * unqiue hash used to avoid redundant articles
	 * md5(title-<source>)
	 */
	fingerprint: String,
	title: String, // article title
	abstract: String, // article description
	article: String, // full article
	url: String, // web url to article
	thumbnail: String, // url to article image
	source: String, // news vendor (e.g. Guardian)
	publishedAt: Date, // published date
}, { timestamps: true });

newsSchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			url: this.url,
			title: this.title,
		};
		return full ? {
			// full view += simple view
			...view,
			source: this.source,
			abstract: this.abstract,
			article: this.article,
			thumbnail: this.thumbnail,
		} : view;
	},
};

newsSchema.plugin(mongooseKeywords, {
	paths: [
		'title',
		'abstract',
		'source',
	],
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
