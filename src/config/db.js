const mysql = require('mysql');
const config = require('./config')

const db = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    port: config.port,
    password : config.password,
    database : config.database,
    insecureAuth: true,
    dateStrings:"date" // mysql 에서 시간 갖어올때 
});

db.connect();

module.exports = db;

