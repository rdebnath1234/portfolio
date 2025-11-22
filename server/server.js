require("dotenv").config(); // Load .env values

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// Routes
const skillsRoutes = require("./routes/skills");
const projectsRoutes = require("./routes/projects");

// Models
const Message = require("./models/Message");

const app = express();
const PORT = process.env.PORT || 5001;

// ===========================
// ✅ CORS Setup
// ===========================
const allowedOrigins = [
  "https://rdebnath1234.github.io", // GitHub Pages frontend
  "http://localhost:3000"           // Local frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman/curl
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS policy does not allow this origin."), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ===========================
// ✅ Body Parser
// ===========================
app.use(express.json());

// ===========================
// ✅ MongoDB Connection
// ===========================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// ===========================
// ✅ Nodemailer Setup
// ===========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// ===========================
// ✅ API Routes
// ===========================
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);

// Contact form POST route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Contact info GET route (reads from contact.json)
app.get("/api/contact-info", (req, res) => {
  const contactFilePath = path.join(__dirname, "data", "contact.json");
  fs.readFile(contactFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contact.json:", err);
      return res.status(500).json({ error: "Could not read contact info" });
    }
    const contactInfo = JSON.parse(data);
    res.json(contactInfo);
  });
});

// ===========================
// ✅ Default test route
// ===========================
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully 🚀");
});

// ===========================
// ✅ Serve React Frontend in Production (Optional)
// ===========================
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build"); // adjust if client folder is outside server
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ===========================
// ✅ Start Server
// ===========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
