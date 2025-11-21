require("dotenv").config(); // Load .env values

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Routes
const skillsRoutes = require("./routes/skills");
const projectsRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

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
    if (!origin) return callback(null, true); // Allow Postman or curl requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy does not allow this origin.";
      return callback(new Error(msg), false);
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
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// ===========================
// ✅ API Routes
// ===========================
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactRoutes);

// ===========================
// ✅ Default Route
// ===========================
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully 🚀");
});

// ===========================
// ✅ Serve React Frontend in Production
// ===========================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// ===========================
// ✅ Start Server
// ===========================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
