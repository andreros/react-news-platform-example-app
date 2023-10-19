const express = require('express');
const app = express();
const cors = require('cors');
const articlesRouter = require('./routes/articles');
const bookmarksRouter = require('./routes/bookmarks');
const config = require('./config');

app.use(cors());
app.use(express.json());

app.get(`${config.basePath}/`, (req, res) => {
    res.json({ message: 'alive' });
});

app.use(`${config.basePath}/articles/`, articlesRouter);

app.use(`${config.basePath}/bookmarks/`, bookmarksRouter);

app.listen(config.defaultPort, () => {
    console.log(`News Platform API listening at http://localhost:${config.defaultPort}${config.basePath}/`);
});
