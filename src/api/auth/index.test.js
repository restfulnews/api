/* globals beforeEach, expect, test */

const { stub } = require('sinon');
const request = require('supertest-as-promised');
const { masterKey } = require('../../config');
const { User } = require('../user');
const { verify } = require('../../services/jwt');
const facebook = require('../../services/facebook');
const google = require('../../services/google');
const express = require('../../services/express');
const routes = require('.');

const app = () => express(routes);

let user;

beforeEach(async () => {
	user = await User.create({ email: 'a@a.com', password: '123456' });
});

test('POST /auth 201 (master)', async () => {
	const { status, body } = await request(app())
		.post('/')
		.query({ access_token: masterKey })
		.auth('a@a.com', '123456');
	expect(status).toBe(201);
	expect(typeof body).toBe('object');
	expect(typeof body.token).toBe('string');
	expect(typeof body.user).toBe('object');
	expect(body.user.id).toBe(user.id);
	expect(await verify(body.token)).toBeTruthy();
});

test('POST /auth 400 (master) - invalid email', async () => {
	const { status, body } = await request(app())
		.post('/')
		.query({ access_token: masterKey })
		.auth('invalid', '123456');
	expect(status).toBe(400);
	expect(typeof body).toBe('object');
	expect(body.param).toBe('email');
});

test('POST /auth 400 (master) - invalid password', async () => {
	const { status, body } = await request(app())
		.post('/')
		.query({ access_token: masterKey })
		.auth('a@a.com', '123');
	expect(status).toBe(400);
	expect(typeof body).toBe('object');
	expect(body.param).toBe('password');
});

test('POST /auth 401 (master) - user does not exist', async () => {
	const { status } = await request(app())
		.post('/')
		.query({ access_token: masterKey })
		.auth('b@b.com', '123456');
	expect(status).toBe(401);
});

test('POST /auth 401 (master) - wrong password', async () => {
	const { status } = await request(app())
		.post('/')
		.query({ access_token: masterKey })
		.auth('a@a.com', '654321');
	expect(status).toBe(401);
});

test('POST /auth 401 (master) - missing access_token', async () => {
	const { status } = await request(app())
		.post('/')
		.auth('a@a.com', '123456');
	expect(status).toBe(401);
});

test('POST /auth 401 (master) - missing auth', async () => {
	const { status } = await request(app())
		.post('/')
		.query({ access_token: masterKey });
	expect(status).toBe(401);
});

test('POST /auth/facebook 201', async () => {
	stub(facebook, 'getUser', () => Promise.resolve({
		service: 'facebook',
		id: '123',
		name: 'user',
		email: 'b@b.com',
		picture: 'test.jpg',
	}));
	const { status, body } = await request(app())
		.post('/facebook')
		.send({ access_token: '123' });
	expect(status).toBe(201);
	expect(typeof body).toBe('object');
	expect(typeof body.token).toBe('string');
	expect(typeof body.user).toBe('object');
	expect(await verify(body.token)).toBeTruthy();
});

test('POST /auth/facebook 401 - missing token', async () => {
	const { status } = await request(app())
		.post('/facebook');
	expect(status).toBe(401);
});

test('POST /auth/google 201', async () => {
	stub(google, 'getUser', () => Promise.resolve({
		service: 'google',
		id: '123',
		name: 'user',
		email: 'b@b.com',
		picture: 'test.jpg',
	}));
	const { status, body } = await request(app())
		.post('/google')
		.send({ access_token: '123' });
	expect(status).toBe(201);
	expect(typeof body).toBe('object');
	expect(typeof body.token).toBe('string');
	expect(typeof body.user).toBe('object');
	expect(await verify(body.token)).toBeTruthy();
});

test('POST /auth/google 401 - missing token', async () => {
	const { status } = await request(app())
		.post('/google');
	expect(status).toBe(401);
});
