const mongoose = require('mongoose');

const uploadDB = mongoose.createConnection(
    process.env.UPLOAD_DB_URI
);

uploadDB.on('connected', () => {
    console.log('Upload DB connected');
});

module.exports = uploadDB;
