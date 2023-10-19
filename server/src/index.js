const api = require('./server/api');
const config = require('./config');

api.listen(config.defaultPort, () => {
    console.log(`${config.appName} API listening at http://localhost:${config.defaultPort}${config.basePath}/`);
});
