const { Router } = require('express');
const config = require('../../config');
const jwt = require('../../services/jwt');
const User = require('../user/model');
const { ObjectId } = require('mongoose').Types;

const router = new Router();

if (config.debug) {
	router.get('/login/:id', (req, res) => {
		User.findOne(new ObjectId(req.params.id))
			.then((user) => {
				if (!user) return res.send('User not found');
				const tokenJwt = jwt.sign(req.params.id);
				res.cookie('jwt', tokenJwt);
				return res.json({ jwt: tokenJwt });
			});
	});
}

module.exports = router;
