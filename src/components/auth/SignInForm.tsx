import React from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import SocialButtons from "./SocialButtons";

interface SignInFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    isSubmitting: boolean;
    errorMessage: string;
    handleEmailSubmit: (e: React.FormEvent) => void;
    handleGoogleSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleGithubSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SignInForm({
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isSubmitting,
    errorMessage,
    handleEmailSubmit,
    handleGoogleSignIn,
    handleGithubSignIn,
}: SignInFormProps) {
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
                isSignUp={false}
            />

            {/* Divider */}
            <div className="auth-divider">
                <div className="auth-divider-line"></div>
                <span className="auth-divider-text">Or continue with email</span>
                <div className="auth-divider-line"></div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSubmit}>
                {/* Email Input */}
                <div className="auth-input-group">
                    <label className="auth-label">Email Address</label>
                    <div className="auth-input-wrapper">
                        <Mail className="auth-input-icon" />
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="auth-input with-icon"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="auth-input-group">
                    <label className="auth-label">Password</label>
                    <div className="auth-input-wrapper">
                        <Lock className="auth-input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="auth-input with-icon with-action"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="auth-input-action"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="auth-forgot-password">
                    <a href="#" className="auth-forgot-link">
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
