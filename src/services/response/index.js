const { APIError } = require('../../utils');

exports.success = (res, status) => (entity) => {
	if (entity) return res.status(status || 200).json(entity);
	return res.status(200).end();
};

exports.notFound = () => (entity) => {
	if (entity) return entity;
	throw new APIError(404);
};

exports.authorOrAdmin = (res, user, userField) => (entity) => {
	if (!entity) return null;
	const isAdmin = user.role === 'admin';
	const isAuthor = entity[userField] && entity[userField].equals(user.id);
	if (isAuthor || isAdmin) return entity;
	return res.status(401).end();
};
