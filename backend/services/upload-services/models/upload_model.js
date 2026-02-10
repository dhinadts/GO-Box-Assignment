// services/upload-service/models/upload.model.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    image1: String,
    image2: String,
    pdf: String,
    userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Upload', uploadSchema);
