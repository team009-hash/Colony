import React from "react";
import { User, Mail, Lock } from "lucide-react";
import SocialButtons from "./SocialButtons";

interface SignUpFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    fullName: string;
    setFullName: (name: string) => void;
    isSubmitting: boolean;
    errorMessage: string;
    handleEmailSubmit: (e: React.FormEvent) => void;
    handleGoogleSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleGithubSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SignUpForm({
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    isSubmitting,
    errorMessage,
    handleEmailSubmit,
    handleGoogleSignIn,
    handleGithubSignIn,
}: SignUpFormProps) {
    return (
        <div>
            {/* Error Message */}
            {errorMessage && (
                <div className="auth-error">
                    ⚠️ {errorMessage}
                </div>
            )}

            {/* Social Buttons */}
            <SocialButtons 
                handleGoogleSignIn={handleGoogleSignIn}
                handleGithubSignIn={handleGithubSignIn}
                isSignUp={true}
            />

            {/* Divider */}
            <div className="auth-divider">
                <div className="auth-divider-line"></div>
                <span className="auth-divider-text">Or sign up with email</span>
                <div className="auth-divider-line"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSubmit}>
                {/* Full Name Input */}
                <div className="auth-input-group">
                    <label className="auth-label">Full Name</label>
                    <div className="auth-input-wrapper">
                        <User className="auth-input-icon" />
                        <input
                            type="text"
                            className="auth-input with-icon"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className="auth-input-group">
                    <label className="auth-label">Email Address</label>
                    <div className="auth-input-wrapper">
                        <Mail className="auth-input-icon" />
                        <input
                            type="email"
                            className="auth-input with-icon"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="auth-input-group">
                    <label className="auth-label">Password</label>
                    <div className="auth-input-wrapper">
                        <Lock className="auth-input-icon" />
                        <input
                            type="password"
                            className="auth-input with-icon"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isSubmitting}
                    style={{ marginTop: '0.5rem' }}
                >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}
