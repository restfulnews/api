const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const notifier = require('../../services/notifier');
const config = require('../../config');
const sendMail = require('../../services/sendgrid');
const templates = require('../../services/templates');
const { success, notFound } = require('../../services/response/');
const Access = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return Access.create(body)
		.then(access => access.view(true))
		.then((access) => res.status(201).json(access))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	Access.find({ archived: { $ne: true } }, select, cursor)
		.then(access => access.map(entityObject => entityObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Access.findById(params.id)
		.then(notFound(res))
		.then(access => (access ? access.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Access.findById(params.id)
		.then(notFound(res))
		.then(access => (access ? _.extend(access, body).save() : null))
		.then(access => (access ? access.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Access.findById(params.id)
		.then(notFound(res))
		.then(access => (access ? access.remove() : null))
		.then(success(res, 204))
		.catch(next);
