const mongoose = require('mongoose');
const authDB = require('../db');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = authDB.model('User', userSchema);
