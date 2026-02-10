const User = require('../models/auth_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};
