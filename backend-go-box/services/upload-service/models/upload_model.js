const mongoose = require('mongoose');
const uploadDB = require('../db');

const uploadSchema = new mongoose.Schema(
    {
        image1: String,
        image2: String,
        pdf: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = uploadDB.model('Upload', uploadSchema);
