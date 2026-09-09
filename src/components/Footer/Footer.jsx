import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-top">
          <h2>Need Update On Latest Offers</h2>
          <p>Subscribe to our newletter to get frequent update</p>
          <div className="input-footer">
            <input type="email" placeholder="Enter Your Email" />
            <button>Join Now</button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <h2>Food Kitchen</h2>
            <div className="socials">
              <a
                href="https://www.facebook.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="social-icon" />
              </a>
              <a
                href="https://www.instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" />
              </a>
              {/* <FaYoutube className="social-icon" /> */}

              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="social-icon" />
              </a>
            </div>
          </div>
          <div className="footer-right">
            <ul>
              {/* <Link to="/">Home</Link> */}
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="home"
              >
                Home
              </Link>
              <li>Services</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <p className="copyright">© 2026 FoodKitchen. All rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
