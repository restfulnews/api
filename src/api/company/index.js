const { Router } = require('express');
const { token } = require('../../services/passport');
const {
	search, // create,
} = require('./controller');

const router = new Router();

/**
 * CUSTOM ROUTES
 */

/**
* GENERIC ROUTES (do not modify these)
*/
/*
router.post(
	'/',
	token({ required: true }),
	create,
);
*/

router.get(
	'/',
	token({ required: true }),
	search,
);

module.exports = router;
