import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// =======================
// MongoDB Connection
// =======================
mongoose
    .connect(process.env.UPLOAD_DB_URI)
    .then(() => {
        console.log("✅ Upload DB connected:", mongoose.connection.name);
    })
    .catch((err) => {
        console.error("❌ Upload DB connection error:", err);
    });

// =======================
// Upload Schema
// =======================
const uploadSchema = new mongoose.Schema(
    {
        filename: String,
        path: String,
    },
    { timestamps: true }
);

const Upload = mongoose.model("Upload", uploadSchema);

// =======================
// Multer Setup
// =======================
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// =======================
// Routes
// =======================
app.get("/health", (req, res) => {
    res.json({ status: "Upload Service Running" });
});

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = await Upload.create({
            filename: req.file.filename,
            path: req.file.path,
        });

        res.status(201).json({
            message: "File uploaded",
            file,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Upload service running on port ${PORT}`);
});
