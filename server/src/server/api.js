const express = require('express');
const cors = require('cors');

const api = express();
const config = require('../config');

const articlesRouter = require('../routes/articles');
const bookmarksRouter = require('../routes/bookmarks');

api.use(cors());
api.use(express.json());

api.get(`${config.basePath}/`, (req, res) => {
    res.json({ message: 'alive' });
});

api.use(`${config.basePath}/articles/`, articlesRouter);

api.use(`${config.basePath}/bookmarks/`, bookmarksRouter);

module.exports = api;
