const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'user_info'
});

module.exports = db;