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

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields required" });
  }

  try {
    // 1️⃣ Save message into MongoDB
    const newMessage = new Message({ name, email, message });
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
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (mailError) {
      console.error("Email send failed:", mailError);
      return res.status(201).json({
        success: true,
        message: "Message saved, but email delivery failed.",
        mailError: mailError.code || "EMAIL_FAILED"
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
