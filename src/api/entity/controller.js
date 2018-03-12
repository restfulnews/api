const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const notifier = require('../../services/notifier');
const config = require('../../config');
const sendMail = require('../../services/sendgrid');
const templates = require('../../services/templates');
const { success, notFound } = require('../../services/response/');
const Entity = require('./model');

/**
* CUSTOM FUNCTIONS
*/


/**
* GENERIC FUNCTIONS (do not modify)
*/

exports.create = ({ body, user }, res, next) => {
	return Entity.create(body)
		.then(entity => entity.view(true))
		.then((entity) => {
			res.status(201).json(entity);
			notifier(`A new entity has been added ${config.appUri}/entity/${entity.id}`, {
				subject: 'A new entity has been added.',
				body: templates['new-entity-notification']({
					config, user, entityObject, entity,
				}),
			});
			// TODO: Send entity confirmation from front-page tests
			if (!entity.pilotID) {
				sendMail({
					to: `${user.name} <${user.email}>`,
					subject: 'entity confirmation',
					content: templates['new-entity-confirmation']({
						config, user, entityObject, entity,
					}),
				});
			}
		})
		.catch(next);
};

exports.index = ({ querymen: { query, select, cursor } }, res, next) =>
	Entity.find({ archived: { $ne: true } }, select, cursor)
		.then(entity => entity.map(entityObject => entityObject.view(true)))
		.then(success(res))
		.catch(next);

exports.show = ({ params }, res, next) =>
	Entity.findById(params.id)
		.then(notFound(res))
		.then(entity => (entity ? entity.view() : null))
		.then(success(res))
		.catch(next);

exports.update = ({ body, params }, res, next) =>
	Entity.findById(params.id)
		.then(notFound(res))
		.then(entity => (entity ? _.extend(entity, body).save() : null))
		.then(entity => (entity ? entity.view(true) : null))
		.then(success(res))
		.catch(next);

exports.destroy = ({ params }, res, next) =>
	Entity.findById(params.id)
		.then(notFound(res))
		.then(entity => (entity ? entity.remove() : null))
		.then(success(res, 204))
		.catch(next);
