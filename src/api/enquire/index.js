const { Router } = require('express');
const {
	enquire,
} = require('./controller');

const router = new Router();

/**
 * CUSTOM ROUTES
 */

/**
 * @api {post} /messenger/enquire Create an enquiry (enquiry send to enquires@restful-api)
 * @apiName CreateMessenger
 * @apimessenger Messenger
 * @apiParam email Enquirer's email
 * @apiParam subject Email subject
 * @apiParam name Sender's name
 * @apiParam enquiry Message being sent
 * @apiParam <param> <something>
 * @apiSuccess {Object} Messenger messenger data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 messenger role not found.
 */
router.post(
	'/',
	enquire,
);

module.exports = router;
