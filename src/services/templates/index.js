const path = require('path');
const dot = require('dot');

const templatePaths = path.join(__dirname, '../../templates');

const dots = dot.process({ path: templatePaths });

module.exports = dots;
