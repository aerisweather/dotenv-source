# dotenv-source
Use a secrets file that isn't committed to your repo, commit your non-secret environment config.

[![Build Status](https://travis-ci.org/aerisweather/node-dotenv-source.svg?branch=master)](https://travis-ci.org/aerisweather/node-dotenv-source)
[![Coverage Status](https://coveralls.io/repos/github/aerisweather/node-dotenv-source/badge.svg?branch=master)](https://coveralls.io/github/aerisweather/node-dotenv-source?branch=master)

A small extension to [dotenv](https://github.com/motdotla/dotenv), this allows the user to separate secret config from application config for applications that are deployed to multiple environments.

## Example

Quick example, create 2 files:

.env:
```
SECRETS_ENV_PATH=.env.secrets
HELLO=world
```
.env.secrets
```
SECRET_KEY=abc123
```

Then load config, just like you would with `dotenv`:
```javascript
const appEnvConfig = require('dotenv-secret').config();

process.env.HELLO === 'world';
process.env.SECRET_KEY === 'abc123';
```

## Options
In addition to the base [dotenv Options](https://github.com/motdotla/dotenv#options), `dotenv-secret` has a few more:

### .env SECRETS_ENV_PATH

Include SECRETS_ENV_PATH in your env file to point to another env file. This file will be parsed and it's variables will overwrite your base env file. Relative file paths are supported.

### options.secretsEnvPath

Overrides environment SECRETS_ENV_PATH, should be a path to a secrets file you wish to source. This file will be parsed and it's variables will overwrite your base env file. Relative path will work, just will be relative to the `cwd()` of the script.


## Project Setup

.gitignore Examples:
<table>
	<thead>
		<tr>
			<th>Ignore local & secrets</th>
			<th>Explicitly keep environments</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
                .env.local*<br/>
                .env.secrets*<br/>
            </td>
            <td>
                .env*<br/>
                !.env.production<br/>
                !.env.staging<br/>
                !.env.test<br/>
                !.env.secrets.example<br/>
            </td>
		</tr>
	</tbody>
</table>

Which allows developers to create many local environments, name them whatever they want and not worry about accidentally comitting them.

### Should I have multiple `.env` files?

Yes. You work on a team in real life. Your servers aren't pets, they shouldn't have config that isn't provisioned. Your configuration will vary between local, testing, staging, and production. Those environment configs should be shared with the team. Private configuration like credentials should be kept private and non committed, but referenced in the environment's config.

## Todo

* Add ability to specify multiple other .env files to load.