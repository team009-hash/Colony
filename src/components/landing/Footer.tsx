import React from "react";
import { Twitter, Facebook, Linkedin, Instagram, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="landing-footer">
            <div className="landing-footer-container">
                <div className="landing-footer-grid">
                    {/* Brand Section */}
                    <div className="landing-footer-brand-section">
                        <div className="landing-footer-brand">
                            <div className="landing-footer-brand-icon">
                                <span>C</span>
                            </div>
                            <span className="landing-footer-brand-text">Colony</span>
                        </div>
                        <p className="landing-footer-description">
                            Empowering hybrid teams to work smarter, stay connected, and thrive together.
                        </p>
                        <div className="landing-footer-newsletter">
                            <h4 className="landing-footer-newsletter-title">Stay Updated</h4>
                            <div className="landing-footer-newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="landing-footer-newsletter-input"
                                />
                                <button className="landing-footer-newsletter-button">
                                    <Send />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="landing-footer-section-title">Product</h4>
                        <ul className="landing-footer-links">
                            <li><a href="#features">Features</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#how-it-works">How it Works</a></li>
                            <li><a href="#testimonials">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="landing-footer-section-title">Company</h4>
                        <ul className="landing-footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#press">Press Kit</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="landing-footer-section-title">Resources</h4>
                        <ul className="landing-footer-links">
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#docs">Documentation</a></li>
                            <li><a href="#api">API Reference</a></li>
                            <li><a href="#community">Community</a></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="landing-footer-section-title">Legal</h4>
                        <ul className="landing-footer-links">
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                            <li><a href="#cookies">Cookie Policy</a></li>
                            <li><a href="#gdpr">GDPR</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="landing-footer-bottom">
                    <div className="landing-footer-bottom-content">
                        <p className="landing-footer-copyright">
                            © 2024 Colony. All rights reserved.
                        </p>

                        <div className="landing-footer-social-icons">
                            <a href="#twitter" className="landing-footer-social-icon">
                                <Twitter />
                            </a>
                            <a href="#facebook" className="landing-footer-social-icon">
                                <Facebook />
                            </a>
                            <a href="#linkedin" className="landing-footer-social-icon">
                                <Linkedin />
                            </a>
                            <a href="#instagram" className="landing-footer-social-icon">
                                <Instagram />
                            </a>
                        </div>

                        <div className="landing-footer-bottom-links">
                            <a href="#privacy">Privacy</a>
                            <a href="#terms">Terms</a>
                            <a href="#cookies">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
