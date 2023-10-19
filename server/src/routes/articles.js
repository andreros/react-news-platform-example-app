const express = require('express');
const router = express.Router();
const articles = require('../services/articles');

/* GET articles listing. */
router.get('/', function (req, res, next) {
    try {
        res.json(articles.getMultiple(req.query));
    } catch (err) {
        console.error('Error while getting articles: ', err.message);
        next(err);
    }
});

/* GET article. */
router.get('/:id', function (req, res, next) {
    try {
        const result = articles.getOne(req.params.id);
        if (Object.keys(result).length !== 0) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        console.error('Error while getting article: ', err.message);
        next(err);
    }
});

/* POST article */
router.post('/', function (req, res, next) {
    try {
        res.json(articles.create(req.body));
    } catch (err) {
        console.error('Error while adding article: ', err.message);
        next(err);
    }
});

module.exports = router;
