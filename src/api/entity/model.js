const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const missionSchema = new mongoose.Schema({
	// TODO: Reconsider approach to date after UX discussion
	client: { type: ObjectId, ref: 'User' },
	pilot: { type: ObjectId, ref: 'User' },
	organisation: { type: ObjectId, ref: 'Organisation' },
	archived: {
		type: Boolean,
		default: false,
	},
	awsRef: {
		type: String,
		unique: true,
		// TODO: Does this actually retry?
		default: shortid.generate,
	},
	title: String,
	description: String,
	isPublic: {
		type: Boolean,
		default: true,
	},
	isCharter: Boolean,
	requiredDate: Date,
	charter: {
		date: Date,
		dateIsFlexible: Boolean,
	},
	type: {
		type: String,
		enum: [
			'agriculture',
			'asset-inspection',
			'construction',
			'energy',
			'event',
			'real-estate',
			'recreation',
			'sport',
			'training',
			'other',
		],
	},
	status: {
		type: String,
		enum: [
			'pending',
			'approved',
			'in-flight',
			'complete',
		],
		default: 'pending',
	},
	shots: {
		video: {
			type: Boolean,
			default: false,
		},
		photo: {
			type: Boolean,
			default: false,
		},
		panorama: {
			type: Boolean,
			default: false,
		},
		twomapping: {
			type: Boolean,
			default: false,
		},
		threemapping: {
			type: Boolean,
			default: false,
		},
		thermal: {
			type: Boolean,
			default: false,
		},
	},
	// Location data
	googlePlaceId: String,
	googlePlaceString: String,
	address: {
		// streetNumber: String, deleting
		// streetName: String, deleting
		city: String, // renamed from city to suburb
		state: String, // get from administrative_area_level_1 (short name)
		country: String,
		postal_code: Number, // adding postal_code
	},
	coordinates: {
		longitude: Number,
		latitude: Number,
	},
	flightZone: Object, // renamed from zone to flightZone (GEO)
}, { timestamps: true });

missionSchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			awsRef: this.awsRef,
			title: this.title,
			description: this.description,
			status: this.status,
			type: this.type,
			requiredDate: this.requiredDate,
			address: this.address,
			coordinates: this.coordinates,
			client: this.client,
			pilot: this.pilot,
			organisation: this.organisation,
		};
		return full ? {
			// full view += simple view
			...view,
			isPublic: this.isPublic,
			shots: this.shots,
			flightZone: this.flightZone,
		} : view;
	},
};

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
