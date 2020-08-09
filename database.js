const mysql = require('mysql');
const dbConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'Nodejs'
});
module.exports = dbConnection;

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'Nodejs'
// });