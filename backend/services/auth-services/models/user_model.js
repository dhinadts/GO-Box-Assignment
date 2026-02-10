// services/auth-service/models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});

module.exports = mongoose.model('User', userSchema);
