const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema(
    {
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        pdf: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Upload', uploadSchema);
