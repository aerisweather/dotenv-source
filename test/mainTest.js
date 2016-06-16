const assert = require('assert'),
	dotenvSource = require('../main'),
	path = require('path');

describe("main", function() {

	beforeEach(function() {
		process.env = {};
	});

	describe("Previous behavior", function() {

		it("Should load a file", function() {
			const testPath = path.join(__dirname, '.env.test.basic');
			dotenvSource.config({path : testPath});
			assert.equal(process.env.DOTENV_SOURCE_TEST_HELLO, 'world');
		});

		it("Should parse file correctly", function() {
			const testPath = path.join(__dirname, '.env.test.kitchen-sink');
			const config = dotenvSource.config({path : testPath});

			// Really quick redundant tests, copy paste!
			assert.equal(config.BASIC, 'basic');
			// dotenv doesn't test for variable expansion
			// assert.equal(config.UNDEFINED_EXPAND, undefined);
			assert.equal(config.AFTER_LINE, 'after_line');
			assert.equal(config.EMPTY, '');
			assert.equal(config.DOUBLE_QUOTES, 'double_quotes');
			assert.equal(config.SINGLE_QUOTES, 'single_quotes');
			assert.equal(config.DOUBLE_QUOTES, 'double_quotes');
			assert.equal(config.EXPAND_NEWLINES, 'expand\nnewlines');
			assert.equal(config.DONT_EXPAND_NEWLINES_1, 'dontexpand\\nnewlines');
			assert.equal(config.DONT_EXPAND_NEWLINES_2, 'dontexpand\\nnewlines');
			assert.equal(config.COMMENTS, undefined);

			assert.equal(process.env.BASIC, 'basic');
			// dotenv doesn't test for variable expansion
			// assert.equal(process.env.UNDEFINED_EXPAND, undefined);
			assert.equal(process.env.AFTER_LINE, 'after_line');
			assert.equal(process.env.EMPTY, '');
			assert.equal(process.env.DOUBLE_QUOTES, 'double_quotes');
			assert.equal(process.env.SINGLE_QUOTES, 'single_quotes');
			assert.equal(process.env.DOUBLE_QUOTES, 'double_quotes');
			assert.equal(process.env.EXPAND_NEWLINES, 'expand\nnewlines');
			assert.equal(process.env.DONT_EXPAND_NEWLINES_1, 'dontexpand\\nnewlines');
			assert.equal(process.env.DONT_EXPAND_NEWLINES_2, 'dontexpand\\nnewlines');
			assert.equal(process.env.COMMENTS, undefined);
		});

	});
	
	describe("Use SECRETS_ENV_PATH to include secrets", function() {

		it("Should load relative path", function() {
			const testPath = path.join(__dirname, '.env.link-secret');
			const config = dotenvSource.config({path : testPath});
			assert.equal(config.HELLO, 'world');
			assert.equal(config.SECRET, "Luke is Vader's son");
			assert.equal(process.env.HELLO, 'world');
			assert.equal(process.env.SECRET, "Luke is Vader's son");
		});

		it("Should load relative path, override existing secret", function() {
			const testPath = path.join(__dirname, '.env.with-secret');
			const config = dotenvSource.config({path : testPath});
			assert.equal(config.HELLO, 'world');
			assert.equal(config.SECRET, "Luke is Vader's son");
			assert.equal(process.env.HELLO, 'world');
			assert.equal(process.env.SECRET, "Luke is Vader's son");
		});

	});

	describe("Use passed option to include secrets", function() {
		it("Should load relative path from config options", function() {
			const testPath = path.join(__dirname, '.env.test.basic');
			const secretsEnvPath = path.join(__dirname, '.env.secret');
			const config = dotenvSource.config({path : testPath, secretsEnvPath });
			assert.equal(config.DOTENV_SOURCE_TEST_HELLO, 'world');
			assert.equal(config.SECRET, "Luke is Vader's son");

			assert.equal(process.env.DOTENV_SOURCE_TEST_HELLO, 'world');
			assert.equal(process.env.SECRET, "Luke is Vader's son");
		});

	});
});