const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/go-box', /* {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } */)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));

};

module.exports = connectDB;
