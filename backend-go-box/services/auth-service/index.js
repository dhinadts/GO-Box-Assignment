import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// =======================
// MongoDB Connection
// =======================
mongoose
    .connect(process.env.AUTH_DB_URI)
    .then(() => {
        console.log("✅ Auth DB connected:", mongoose.connection.name);
    })
    .catch((err) => {
        console.error("❌ Auth DB connection error:", err);
    });

// =======================
// User Schema
// =======================
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// =======================
// Routes
// =======================
app.get("/health", (req, res) => {
    res.json({ status: "Auth Service Running" });
});

// Register
app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: "User registered", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Auth service running on port ${PORT}`);
});
