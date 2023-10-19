const db = require('./db');
const config = require('../config');

function getMultiple(queryParams = {}) {
    const { page = 1, userEmail } = queryParams;

    let userEmailClause = '';
    if (userEmail) userEmailClause = `WHERE userEmail LIKE '${userEmail}'`;

    const offset = (page - 1) * config.listPerPage;
    const count = db.query(`SELECT COUNT(*) AS totalRows FROM bookmarks ${userEmailClause}`, []);
    const data = db.query(`SELECT * FROM bookmarks ${userEmailClause} LIMIT ?,?`, [offset, config.listPerPage]);

    const meta = {
        page: parseInt(`${page}`),
        total: count[0].totalRows || 0
    };

    return {
        data,
        meta
    };
}

function getByEmail(userEmail = '', url = '') {
    const data = db.query(`SELECT * FROM bookmarks WHERE userEmail LIKE @userEmail AND url LIKE @url`, { userEmail, url });

    return {
        ...data[0]
    };
}

function validateCreate(bookmarkObj) {
    let messages = [];

    if (!bookmarkObj) messages.push('No bookmark object was provided.');
    if (!bookmarkObj.userEmail) messages.push('Bookmark missing `userEmail` field.');
    if (!bookmarkObj.title) messages.push('Bookmark missing `title` field.');
    if (!bookmarkObj.url) messages.push('Bookmark missing `url` field.');

    if (messages.length) {
        let error = new Error(messages.join(' '));
        error.statusCode = 400;
        throw error;
    }
}

function create(bookmarkObj) {
    validateCreate(bookmarkObj);
    const { userEmail, title, url } = bookmarkObj;
    const result = db.run('INSERT INTO bookmarks (userEmail, title, url) VALUES (@userEmail, @title, @url)', { userEmail, title, url });

    let message = 'Error creating bookmark.';
    if (result.changes) message = 'Bookmark created successfully.';

    return { message };
}

function remove(bookmarkObj) {
    const { id } = bookmarkObj;
    const result = db.run('DELETE FROM bookmarks WHERE id = @id', { id });

    let message = 'Error deleting bookmark.';
    if (result.changes) message = 'Bookmark deleted successfully.';

    return { message };
}

module.exports = {
    getMultiple,
    getByEmail,
    create,
    remove
};
