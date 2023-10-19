const SQLite = require('better-sqlite3');
const path = require('path');
const config = require('../config');
const db = new SQLite(path.resolve(config.databasePath), { fileMustExist: true });

function query(sql, params) {
    return db.prepare(sql).all(params);
}

function run(sql, params) {
    return db.prepare(sql).run(params);
}

module.exports = {
    query,
    run
};
