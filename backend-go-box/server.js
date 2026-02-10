require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// connect databases
require('./services/auth-service/db');
require('./services/upload-service/db');

// routes
app.use('/api/auth', require('./services/auth-service/routes/auth_route'));
app.use('/api/files', require('./services/upload-service/routes/upload_route'));

app.get('/', (req, res) => {
    res.send('Microservices backend running');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
