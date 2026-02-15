const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Message = require("../models/Message"); // MongoDB model
const contact = require("../data/contact.json"); // Static contact info

// ===========================
// 📌 GET CONTACT INFO
// ===========================
router.get("/", (req, res) => {
  res.json(contact);
});

// ===========================
// 📌 POST CONTACT FORM (React → Node)
// Saves to MongoDB + Sends Email
// ===========================
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  const safeName = typeof name === "string" ? name.trim() : "";
  const safeEmail = typeof email === "string" ? email.trim() : "";
  const safeMessage = typeof message === "string" ? message.trim() : "";

  if (!safeName || !safeEmail || !safeMessage) {
    return res.status(400).json({ success: false, error: "All fields required" });
  }

  try {
    // 1️⃣ Save message into MongoDB
    const newMessage = new Message({ name: safeName, email: safeEmail, message: safeMessage });
    await newMessage.save();

    // 2️⃣ Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER, // Gmail user from .env
        pass: process.env.GMAIL_PASS  // Gmail App Password
      }
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "📩 New Message From Portfolio Website",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (mailError) {
      console.error("Email send failed:", mailError);
      await Message.deleteOne({ _id: newMessage._id });
      return res.status(502).json({
        success: false,
        error: "Message could not be delivered. Please try again.",
        code: mailError.code || "EMAIL_FAILED"
      });
    }

  } catch (error) {
    console.error("Contact Form Error:", error);

    // Check if MongoDB error or email sending error
    let errorMessage = "Server error";
    if (error.code === 535) errorMessage = "Email authentication failed";

    res.status(500).json({ success: false, error: errorMessage });
  }
});

module.exports = router;
