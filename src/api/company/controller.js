const _ = require('lodash');
const { success, notFound } = require('../../services/response/');
const Company = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return Company.create(body)
		.then(company => company.view(true))
		.then((company) => res.status(201).json(company))
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	Company.find({ archived: { $ne: true } }, select, cursor)
		.then(company => company.map(entityObject => entityObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Company.findById(params.id)
		.then(notFound(res))
		.then(company => (company ? company.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Company.findById(params.id)
		.then(notFound(res))
		.then(company => (company ? _.extend(company, body).save() : null))
		.then(company => (company ? company.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Company.findById(params.id)
		.then(notFound(res))
		.then(company => (company ? company.remove() : null))
		.then(success(res, 204))
		.catch(next);
