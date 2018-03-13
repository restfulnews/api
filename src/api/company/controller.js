const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const notifier = require('../../services/notifier');
const config = require('../../config');
const sendMail = require('../../services/sendgrid');
const templates = require('../../services/templates');
const { success, notFound } = require('../../services/response/');
const Key = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return Key.create(body)
		.then(key => key.view(true))
		.then((key) => res.status(201).json(key))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	Key.find({ archived: { $ne: true } }, select, cursor)
		.then(key => key.map(entityObject => entityObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Key.findById(params.id)
		.then(notFound(res))
		.then(key => (key ? key.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Key.findById(params.id)
		.then(notFound(res))
		.then(key => (key ? _.extend(key, body).save() : null))
		.then(key => (key ? key.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Key.findById(params.id)
		.then(notFound(res))
		.then(key => (key ? key.remove() : null))
		.then(success(res, 204))
		.catch(next);
