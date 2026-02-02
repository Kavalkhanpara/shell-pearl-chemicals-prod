// backend/server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

/* ===== FIX __dirname ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== MIDDLEWARE ===== */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* ================= CONTACT API (BREVO HTTP API) ================= */
app.post("/api/contact", async (req, res) => {
  console.log("🔥 /api/contact HIT", req.body);

  const { name, email, phone, location, product, quantity, message } = req.body;


  if (!name || !email || !phone || !location || !product || !quantity || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    console.log("🚀 Sending email via Brevo API");
    console.log("API KEY:", process.env.BREVO_API_KEY ? "FOUND" : "MISSING");


    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Shell & Pearl Chemicals",
          email: process.env.BREVO_SENDER,
        },
        to: [{ email: process.env.BREVO_RECEIVER }],
        subject: `📩 New Chemical Inquiry - ${name}`,
        htmlContent: `
          <h2>New Inquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Location:</b> ${location}</p>
          <p><b>Product:</b> ${product}</p>
          <p><b>Quantity:</b> ${quantity}</p>
          <p><b>Message:</b> ${message}</p>
          <hr/>
          <p>Shell & Pearl Chemicals</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return res.json({
      success: true,
      message: "✅ Inquiry sent successfully",
    });

  } catch (error) {
    console.error("❌ Brevo API Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "❌ Mail sending failed",
    });
  }
});

/* ================= SERVE FRONTEND ================= */
const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
