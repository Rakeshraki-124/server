console.log("Starting server.js...");

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000; // Use Render's assigned port

console.log(`Using port: ${port}`);

// Enable CORS (to allow frontend to connect)
app.use(cors());

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to uploads/");
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        console.log("Saving file:", file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload middleware
const upload = multer({ storage });

// Serve static files (uploaded files)
app.use("/uploads", express.static("uploads"));

// API Route for Uploading Files
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        console.log("No file uploaded.");
        return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("File uploaded:", req.file.filename);
    res.json({ fileUrl: `https://your-app.onrender.com/uploads/${req.file.filename}` });
});

console.log("Trying to start the server...");

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running at https://your-app.onrender.com`);
});
