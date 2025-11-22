require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const skillsRoutes = require("./routes/skills");
const projectsRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5001;

/* CORS */
app.use(cors({
  origin: [
    "https://rdebnath1234.github.io",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

/* Routes */
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactRoutes);   // ✅ FIXED CONTACT ROUTE

/* Test route */
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully 🚀");
});

/* Serve build */
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
