const tape = require('tape');
const fs = require('fs');
const path = require('path');
const dots = require('.');

tape.test('All dot template files compile', (t) => {
	const templatePaths = path.resolve(__filename, '../../../templates');
	const files = fs.readdirSync(templatePaths)
		.map(file => /(.*)\.dot/g.exec(file)[1]);
	t.plan(files.length + 1);
	t.ok(files.length > 0, 'There are dot files to compile, otherwise what are we doing here?');
	files.forEach((file) => {
		t.ok(typeof dots[file] === 'function', `${file}.dot compiles to Dot template.`);
	});
	t.end();
});
