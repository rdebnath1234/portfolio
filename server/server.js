require("dotenv").config();  // Load .env values

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const skillsRoutes = require("./routes/skills");
const projectsRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = [
  "https://rdebnath1234.github.io",
  "http://localhost:3000"
];
// Middlewares
app.use(cors({
  origin: allowedOrigins // your frontend URL
}));
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running Successfully 🚀");
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
