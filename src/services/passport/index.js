const passport = require('passport');
const pino = require('pino')();
const { Schema } = require('bodymen');
const { BasicStrategy } = require('passport-http');
const { Strategy: JSONStrategy } = require('passport-json');
const { Strategy: CustomStrategy } = require('passport-custom');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('../../config');
const { googleCustomStrategy } = require('../google');
const User = require('../../api/user/model');
const { APIError, ErrorsArray } = require('../../utils');

exports.basic = () => (req, res, next) =>
	passport.authenticate('basic', { session: false }, (err, user) => {
		// Server error
		if (err) return next(err);
		// Bad username or password
		if (!user) {
			return next(new APIError(401, new ErrorsArray('auth.invalidCredentials')));
		}
		req.logIn(user, { session: false }, (loginErr) => {
			if (loginErr) return next(loginErr);
			return next();
		});
	})(req, res, next);

exports.json = () => (req, res, next) =>
	passport.authenticate('json', { session: false }, (err, user) => {
		// Server error
		if (err) return next(err);
		// Bad username or password
		if (!user) {
			return next(new APIError(401, new ErrorsArray('auth.invalidCredentials')));
		}
		req.logIn(user, { session: false }, (loginErr) => {
			if (loginErr) return next(loginErr);
			return next();
		});
	})(req, res, next);

exports.token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
	passport.authenticate('token', { session: false }, (err, user, info) => {
		if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
			return next(new APIError(401, new ErrorsArray('auth.invalidCredentials')));
		}
		req.logIn(user, { session: false }, (loginErr) => {
			// TODO: Under what circumstances would this fail? Is this the correct error to return?
			if (loginErr) return next(new APIError(401, new ErrorsArray('auth.invalidCredentials'), loginErr));
			return next();
		});
	})(req, res, next);

function passwordAuthentication(email, password, done) {
	const userSchema = new Schema({
		email: User.schema.tree.email,
		password: User.schema.tree.password,
	});
	userSchema.validate({ email, password }, (err) => {
		if (err) return done(new APIError(400, new ErrorsArray('auth.alreadyExists'), err));
		User.findOne({ email })
			.then((user) => {
				if (!user) {
					pino.info('Attempted login. User not found.');
					return done();
				}
				return user.authenticate(password, user.password)
					.then(returnedUser => done(null, returnedUser))
					.catch((authErr) => {
						pino.error(authErr);
						done();
					});
			});
	});
}

exports.google = (req, res, next) => {
	passport.authenticate('google', { session: false }, (err, user) => {
		// Server error
		if (err) return next(err);
		// Bad username or password
		if (!user) {
			return next(new APIError(401, new ErrorsArray('auth.invalidCredentials')));
		}
		req.logIn(user, { session: false }, (loginErr) => {
			if (loginErr) return next(loginErr);
			return next();
		});
	})(req, res, next);
};

passport.use('basic', new BasicStrategy(passwordAuthentication));
passport.use('json', new JSONStrategy({ usernameProp: 'email' }, passwordAuthentication));
passport.use('google', new CustomStrategy(googleCustomStrategy));

function cookieExtractor(req) {
	let token = null;
	if (req && req.cookies) token = req.cookies.jwt;
	return token;
}

passport.use('token', new JwtStrategy({
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromExtractors([
		ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		cookieExtractor,
	]),
}, ({ id }, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(done);
}));

