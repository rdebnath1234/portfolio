require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const skillsRoutes = require("./routes/skills");
const projectsRoutes = require("./routes/projects");
const Message = require("./models/Message");

const app = express();
const PORT = process.env.PORT || 5001;

/* ---------------------------------------------
   ✅ CORS FIX — Works for GitHub Pages + Render
---------------------------------------------- */
app.use(cors({
  origin: [
    "https://rdebnath1234.github.io",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

/* ---------------------------------------------
   ✅ Body Parser
---------------------------------------------- */
app.use(express.json());

/* ---------------------------------------------
   ✅ MongoDB Connection
---------------------------------------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

/* ---------------------------------------------
   ✅ Nodemailer Setup
---------------------------------------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS   // MUST have NO SPACES
  }
});

/* ---------------------------------------------
   ✅ Routes
---------------------------------------------- */
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);

/* ---------------------------------------------
   ✅ Contact POST (Saves to Mongo + Sends Email)
---------------------------------------------- */
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save to DB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send Email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------------------------------------------
   ✅ Contact Info GET (Reads contact.json)
---------------------------------------------- */
app.get("/api/contact", (req, res) => {
  const filePath = path.join(__dirname, "data", "contact.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contact.json:", err);
      return res.status(500).json({ error: "Could not read contact info" });
    }

    res.json(JSON.parse(data));
  });
});

/* ---------------------------------------------
   ✅ Test Route
---------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully 🚀");
});

/* ---------------------------------------------
   ❗ OPTIONAL: Serve Build in Production
---------------------------------------------- */
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/build");

  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

/* ---------------------------------------------
   🚀 Start Server
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
