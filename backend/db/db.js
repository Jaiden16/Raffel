const pgp = require("pg-promise")({});
cn = 'postgres:localhost:5432/raffelapi';
const db = pgp(cn);

module.exports = db;