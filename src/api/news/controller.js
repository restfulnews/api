const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const notifier = require('../../services/notifier');
const config = require('../../config');
const sendMail = require('../../services/sendgrid');
const templates = require('../../services/templates');
const { success, notFound } = require('../../services/response/');
const News = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return News.create(body)
		.then(news => news.view(true))
		.then((news) => res.status(201).json(news))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	News.find({ archived: { $ne: true } }, select, cursor)
		.then(news => news.map(entityObject => entityObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	News.findById(params.id)
		.then(notFound(res))
		.then(news => (news ? news.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	News.findById(params.id)
		.then(notFound(res))
		.then(news => (news ? _.extend(news, body).save() : null))
		.then(news => (news ? news.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	News.findById(params.id)
		.then(notFound(res))
		.then(news => (news ? news.remove() : null))
		.then(success(res, 204))
		.catch(next);
