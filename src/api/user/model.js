const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongooseKeywords = require('mongoose-keywords');
const { env } = require('../../config');
const slug = require('slug');

const { ObjectId } = mongoose.Schema;

// Shorthand
const { Schema } = mongoose;

const roles = ['user', 'admin'];

const userSchema = new Schema({
	contactNumber: String,
	altContactNumber: String,
	onboardingSignUp: Boolean,
	organisation: { type: ObjectId, ref: 'Organisation' },
	approvedPilot: Boolean,
	location: {
		address: {
			streetNumber: String,
			streetName: String,
			city: String,
			state: String,
			country: String,
		},
		coordinates: {
			longitude: Number,
			latitude: Number,
		},
	},
	userProfile: {
		website: String,
		bio: String,
	},
	pilotProfile: {
		workRadius: Number, // Willing to travel
		dob: Date, // Date of birth
		mobilePhone: String,
		telePhone: String, // TODO: Should not be camel case, telephone is one word
		abn: String, // Australian Business Number (Do we need this?)
		rpl: { // Remote Pilot License
			num: String,
			certLink: String,
		},
		aroc: { // Aviation Radio Operator Cert
			num: String,
			certLink: String,
		},
		reoc: { // RPA Operator Certificate
			num: String,
			certLink: String,
		},
		myDrone: String, // Drone Details
		hasInsurance: Boolean,
		hasDrone: Boolean,
		canHire: {
			type: Boolean,
			default: false,
		},
	},
	email: {
		type: String,
		match: /^\S+@\S+\.\S+$/,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	passwordResetCode: {
		type: String,
		required: false,
		expires: 900,
		// TODO: Validate this for extra protection
	},
	password: {
		type: String,
	},
	username: {
		type: String,
		match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
		// unique: true,
	},
	name: {
		type: String,
		index: true,
		text: true,
		trim: true,
		required: true,
	},
	googleId: String,
	googleDomain: String,
	role: {
		type: String,
		enum: roles,
		default: 'user',
	},
	picture: {
		type: String,
		trim: true,
	},
	cover: {
		type: String,
		default: '/images/headerimage.jpg',
	},
}, {
	timestamps: true,
});

userSchema.path('email').set(function setDefaults(email) {
	if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
		const hash = crypto.createHash('md5').update(email).digest('hex');
		this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
	}

	if (!this.name) this.name = email.replace(/^(.+)@.+$/, '$1');

	return email;
});

// Hash password on save
userSchema.pre('save', function password(next) {
	if (!this.isModified('password')) return next();
	/* istanbul ignore next */
	const rounds = env === 'test' ? 1 : 9;
	bcrypt.hash(this.password, rounds)
		.then((hash) => {
			this.password = hash;
			next();
		})
		.catch(next);
});

// Hash password on update
userSchema.pre('update', function password(next) {
	if (!this._update.$set || !this._update.$set.password) return next();
	/* istanbul ignore next */
	const rounds = env === 'test' ? 1 : 9;
	bcrypt.hash(this._update.$set.password, rounds)
		.then((hash) => {
			this._update.$set.password = hash;
			next();
		})
		.catch(next);
});

// TODO: find a better way to allocate slugs
// if the slug hasn't been specified during
// the creation process, just generate one
userSchema.pre('save', function addSlug(next) {
	if (!this.isModified('username')) return next();
	const unPrefix = String(Math.floor(Math.random() * 90000) + 10000);
	this.username = `${slug(this.name).toLowerCase()}-${unPrefix}`;
	return next();
});

userSchema.methods = {
	view(full) {
		const view = {};
		let fields = ['id', 'name', 'picture', 'cover', 'organisation', 'role', 'approvedPilot'];

		if (full) {
			fields = [...fields, 'email', 'username', 'location',
				'userProfile', 'pilotProfile', 'createdAt'];
		}

		fields.forEach((field) => { view[field] = this[field]; });

		return view;
	},

	authenticate(password) {
		return bcrypt.compare(password, this.password).then(valid => (valid ? this : false));
	},
};

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] });
userSchema.statics = { roles };

const User = mongoose.model('User', userSchema);

module.exports = User;
