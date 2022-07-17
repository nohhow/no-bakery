const mysql = require('mysql');

const db = mysql.createPool({
    // host:'localhost',
    // user:'root',
    // password:'',
    // database:'user_info'
    host: process.env.DB_PROD_HOST,
    user: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE
});

module.exports = db;