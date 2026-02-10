const mongoose = require('mongoose');

const authDB = mongoose.createConnection(
    process.env.AUTH_DB_URI
);

authDB.on('connected', () => {
    console.log('Auth DB connected');
});

module.exports = authDB;
