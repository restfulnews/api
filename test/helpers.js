const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv-safe');

const rootEnvPath = path.resolve(__filename, '../../.env');
const envConfig = dotenv.parse(fs.readFileSync(rootEnvPath));

function getEnvVariable(varname) {
	return envConfig[varname];
}

function setEnvVariableFromFile(varname) {
	process.env[varname] = envConfig[varname];
}

module.exports = {
	setEnvVariableFromFile,
	getEnvVariable,
};
