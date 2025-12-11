import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <nav className="landing-nav">
            <div className="landing-nav-container">
                <div className="landing-logo" onClick={() => navigate("/")}>
                    <div className="landing-logo-icon-wrapper">
                        <div className="landing-logo-icon-blur"></div>
                        <div className="landing-logo-icon">
                            <span>C</span>
                        </div>
                    </div>
                    <span className="landing-logo-text">Colony</span>
                </div>

                <div className="landing-nav-links">
                    <a href="#features" className="landing-nav-link">Features</a>
                    <a href="#how-it-works" className="landing-nav-link">How it Works</a>
                    <a href="#testimonials" className="landing-nav-link">Testimonials</a>
                    <a href="#pricing" className="landing-nav-link">Pricing</a>
                </div>

                <div className="landing-nav-buttons">
                    <button
                        onClick={() => navigate("/auth")}
                        className="landing-btn-signin"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/auth")}
                        className="landing-btn-getstarted"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
