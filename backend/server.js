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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, location, product, quantity, message } = req.body;

  if (!name || !email || !phone || !location || !product || !quantity || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Shell & Pearl Chemicals", email: process.env.BREVO_SENDER },
        to: [{ email: process.env.BREVO_RECEIVER }],
        subject: `New Inquiry - ${name}`,
        htmlContent: `
          <h3>New Inquiry</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Location:</b> ${location}</p>
          <p><b>Product:</b> ${product}</p>
          <p><b>Quantity:</b> ${quantity}</p>
          <p><b>Message:</b> ${message}</p>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, message: "Inquiry sent successfully" });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Mail sending failed" });
  }
});

const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));
app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));

app.listen(PORT, () => console.log("Server running on port", PORT));
