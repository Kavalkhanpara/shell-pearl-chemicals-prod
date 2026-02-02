import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Footer from "../components/footer/Footer";
import labBg from "../assets/lab.png";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div
        className="contact-banner"
        style={{ backgroundImage: `url(${labBg})` }}
      >
        <div className="banner-overlay">
          <div className="banner-content centered-banner">
            <div className="left-border" />
            <div className="banner-text-box">
              <h1>Contact Us</h1>
              <p className="breadcrumb">HOME / CONTACT</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>SHELL & PEARL CHEMICALS</h2>
          <h3>Contact For Any Query</h3>

          <div className="contact-details">
            <div className="contact-item">
              <FaMapMarkerAlt /> Ankleshwar GIDC, Bharuch, INDIA
            </div>
            <div className="contact-item">
              <FaPhone /> +91 92743 23212
            </div>
            <div className="contact-item">
              <FaEnvelope /> shellandpearlchemicals@gmail.com
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Contact Us</h2>

          {/* ✅ FORM GOES DIRECTLY TO EMAIL */}
          <form
            action="https://formspree.io/f/xdadleqd"
            method="POST"
          >
            <input name="name" placeholder="Your Name" required />
            <input name="phone" placeholder="Your Mobile" required />
            <input name="email" type="email" placeholder="Your Email" required />
            <input name="location" placeholder="Your Location" required />
            <input name="product" placeholder="Product You Want" required />
            <input name="quantity" placeholder="Quantity / Size" required />
            <textarea
              name="message"
              placeholder="Enter your requirement"
              required
            />

            <button type="submit" className="contact-submit-btn">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
