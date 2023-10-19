const db = require('./db');
const config = require('../config');

function getMultiple(queryParams = {}) {
    const { page = 1, userEmail, category } = queryParams;

    let whereClause = 'WHERE published=1';
    if (userEmail) whereClause += ` AND userEmail LIKE '${userEmail}' `;
    if (category) whereClause += ` AND category LIKE '${category}' `;

    const offset = (page - 1) * config.listPerPage;
    const count = db.query(`SELECT COUNT(*) AS totalRows FROM articles ${whereClause}`, []);
    const data = db.query(`SELECT * FROM articles ${whereClause} LIMIT ?,?`, [offset, config.listPerPage]);

    const meta = {
        page: parseInt(`${page}`),
        total: count[0].totalRows || 0
    };

    return {
        data,
        meta
    };
}

function getOne(id = 0) {
    const data = db.query(`SELECT * FROM articles WHERE id=@id`, { id });

    return {
        ...data[0]
    };
}

function validateCreate(articleObj) {
    let messages = [];

    if (!articleObj) messages.push('No article object was provided.');
    if (!articleObj.userEmail) messages.push('Article missing `userEmail` field.');
    if (!articleObj.category) messages.push('Article missing `category` field.');

    if (messages.length) {
        let error = new Error(messages.join(' '));
        error.statusCode = 400;
        throw error;
    }
}

function create(articleObj) {
    validateCreate(articleObj);
    const { userEmail, category, title, description, image, content, published = 0 } = articleObj;
    const result = db.run(
        `INSERT INTO articles (userEmail, category, title, description, image, content, published)
        VALUES (@userEmail, @category, @title, @description, @image, @content, @published)`,
        { userEmail, category, title, description, image, content, published }
    );

    let message = 'Error creating article.';
    if (result.changes) message = 'Article created successfully.';

    return { message };
}

module.exports = {
    getMultiple,
    getOne,
    create
};
