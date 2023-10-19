const env = process.env;

const config = {
    appName: 'News Platform',
    databasePath: 'database/news.db',
    basePath: '/api/v1',
    defaultPort: env.PORT || 3001,
    listPerPage: env.LIST_PER_PAGE || 10
};

module.exports = config;
