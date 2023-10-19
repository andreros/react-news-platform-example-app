const express = require('express');
const router = express.Router();
const bookmarks = require('../services/bookmarks');

/* GET bookmarks listing. */
router.get('/', function (req, res, next) {
    try {
        res.json(bookmarks.getMultiple(req.query));
    } catch (err) {
        console.error('Error while getting bookmarks: ', err.message);
        next(err);
    }
});

/* GET bookmark. */
router.get('/:userEmail', function (req, res, next) {
    try {
        const result = bookmarks.getByEmail(req.params.userEmail, req.query.url);
        if (Object.keys(result).length !== 0) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        console.error('Error while getting bookmark: ', err.message);
        next(err);
    }
});

/* POST bookmark */
router.post('/', function (req, res, next) {
    try {
        res.json(bookmarks.create(req.body));
    } catch (err) {
        console.error('Error while adding bookmark: ', err.message);
        next(err);
    }
});

/* DELETE bookmark */
router.delete('/', function (req, res, next) {
    try {
        res.json(bookmarks.remove(req.body));
    } catch (err) {
        console.error('Error while adding bookmark: ', err.message);
        next(err);
    }
});

module.exports = router;
