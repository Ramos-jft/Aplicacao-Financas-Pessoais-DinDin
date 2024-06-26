const { dbHost, dbPort, dbName, dbUser, dbPassword } = require('./configs');

const { Pool } = require('pg');

const pool = new Pool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName
});

module.exports = pool;