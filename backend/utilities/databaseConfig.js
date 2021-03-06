const mysql = require('mysql2/promise')
require('dotenv').config({ path: '../.env'})

const pool = mysql.createPool({
    host: process.env.DBhost || "localhost",
    user: process.env.DBuser || "root",
    password: process.env.DBpassword || "Neem05",
    database: process.env.DBname || "sdte",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = { pool }