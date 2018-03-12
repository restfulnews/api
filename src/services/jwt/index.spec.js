const tape = require('tape');
const { sign, verify } = require('.');

const USER_ID = '5a27827fa5337063e5d4fffa';

tape.test('Signs JWTs from Mongo IDs', (t) => {
	const result = sign(USER_ID);
	t.ok(!!verify(result), 'Returns valid JWT');
	t.end();
});
