const dotenv = require('dotenv'),
	path = require('path');

const dotenvConfigOrig = dotenv.config.bind(dotenv);

dotenv.config = function(options) {
	const config = dotenvConfigOrig(options);

	//Config
	const configPath = options.path || '.env';

	var secretsEnvPath = options.secretsEnvPath;
	if(!secretsEnvPath && config.SECRETS_ENV_PATH) {
		secretsEnvPath = path.resolve(path.join(path.dirname(configPath), config.SECRETS_ENV_PATH));
	}

	// Load Secrets file path, if we have one.
	var secretConfig = {};
	if(secretsEnvPath) {
		const secretOptions = Object.assign({}, options, {path: secretsEnvPath});
		secretConfig = dotenvConfigOrig(secretOptions);
		Object.assign(config, secretConfig);
		Object.assign(process.env, secretConfig);
	}
	return config;
};

module.exports = dotenv;