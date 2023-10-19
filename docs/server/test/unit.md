# Setting up a testing environment in a Node.JS + Express.JS API application with Jest + Supertest

The chosen folder structure and file naming reflects a personal choice. Please, feel free to adjust this configuration to your personal taste. For any missing reference or working example, please navigate through the folders and files.

For reference, please take a look at:

- Jest official documentation - [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- Supertest documentation - [https://github.com/ladjs/supertest](https://github.com/ladjs/supertest)

## Pre-requisites

- Node.JS API implemented with Express.JS

## Required Packages

To setup Jest in your project, please install the following packages as project `developer dependencies`:

- cross-env
- jest
- supertest

## Project Scripts

```json
"scripts": {
    ...
    "test": "cross-env NODE_ENV=test jest ./tests/unit --testTimeout=10000 --watch",
    "test:coverage": "cross-env NODE_ENV=test jest ./tests/unit --testTimeout=10000 --coverage"
    ...
}
```

## Jest configuration in `package.json` file

```json
"jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": ["src/**/*.{js,jsx,ts,tsx}"],
    "coveragePathIgnorePatterns": ["/node_modules/"]
}
```

## Unit Tests folder structure

```
├── src
│   └── ...
├── tests
│   └── unit
│       ├── articles
│       │   └── endpoints.test.js
│       ├── bookmarks
│       │   └── ...
│       └── root.endpoint.test.js
├── package.json
```

## Test the environment

Please, take a look at the unit test implemented in `./tests/unit/root.endpoint.test.js` folder. When running the `test` script there should be no error in the terminal console.

## References used for this configuration

- [https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
