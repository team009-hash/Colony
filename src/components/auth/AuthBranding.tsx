import React from "react";

export default function AuthBranding() {
    return (
        <div className="auth-branding font-poppins">
            <div className="auth-logo">
                <div className="auth-logo-icon">C</div>
                <div className="auth-logo-text">Colony</div>
            </div>

            <div className="auth-headline">
                <h1>Work, wellbeing & focus in one place.</h1>
                <p>
                    Colony helps hybrid teams stay organised, connected, and healthy -
                    without burnout.
                </p>
            </div>

            <div className="auth-features">
                <div className="auth-feature-badge">
                    <span className="auth-feature-dot aqua" />
                    <span>Wellbeing check-ins</span>
                </div>
                <div className="auth-feature-badge">
                    <span className="auth-feature-dot blue" />
                    <span>AI productivity coach</span>
                </div>
                <div className="auth-feature-badge">
                    <span className="auth-feature-dot violet" />
                    <span>Accessible dashboards</span>
                </div>
            </div>
        </div>
    );
}
