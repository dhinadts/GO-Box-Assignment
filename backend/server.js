const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/go-box', /* {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } */)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));

};

app.use('/api/auth', require('./services/auth-services/routes/auth_routes'));
app.use('/api/files', require('./services/upload-services/routes/upload_routes'));

app.listen(5000, async () => {
    await connectDB();
    console.log('Server running on port 5000');
});
