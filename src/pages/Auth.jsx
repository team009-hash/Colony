import React, { useState, useEffect } from "react";
import "../styles/auth.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext.jsx";
import {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doSignInWithGithub,
} from "../firebase/auth";
import { ArrowLeft, Sparkles, Lock, Shield } from "lucide-react";
import AuthTabs from "../components/auth/AuthTabs";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";

export default function Auth() {
    const [mode, setMode] = useState("signin"); // "signin" or "signup"
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Reset form state when component mounts (after sign out)
    useEffect(() => {
        setMode("signin");
        setEmail("");
        setPassword("");
        setFullName("");
        setErrorMessage("");
        setShowPassword(false);
        setIsSubmitting(false);
    }, []);

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setErrorMessage("");
        setEmail("");
        setPassword("");
        setFullName("");
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            if (mode === "signin") {
                await doSignInWithEmailAndPassword(email, password);
            } else {
                await doCreateUserWithEmailAndPassword(email, password);
                // store fullName in Firestore later if needed
            }
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await doSignInWithGoogle();
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || "Google sign-in failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGithubSignIn = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await doSignInWithGithub();
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || "GitHub sign-in failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Already logged in? go straight to dashboard
    if (userLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="auth-scope" style={{
            '--color-primary': '#1c6aff',
            '--color-secondary': '#8c7ae7',
            '--color-aqua': '#98f1cf',
            '--color-yellow': '#fbc24e',
            '--color-background': '#f4f6fa',
            '--color-white': '#ffffff',
            '--color-gray-50': '#f9fafb',
            '--color-gray-100': '#f3f4f6',
            '--color-gray-200': '#e5e7eb',
            '--color-gray-300': '#d1d5db',
            '--color-gray-400': '#9ca3af',
            '--color-gray-500': '#6b7280',
            '--color-gray-600': '#4b5563',
            '--color-gray-700': '#374151',
            '--color-gray-800': '#1f2937',
            '--color-gray-900': '#111827'
        }}>
            <div className="auth-page">
                {/* Background Gradient Orbs */}
                <div className="auth-orb auth-orb-1"></div>
                <div className="auth-orb auth-orb-2"></div>
                <div className="auth-orb auth-orb-3"></div>

                {/* Back to Home Button */}
                <button
                    className="auth-back-button"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft />
                    <span>Back to Home</span>
                </button>

                {/* Main Auth Card */}
                <div className="auth-card">
                    {/* Logo & Title */}
                    <div className="auth-header">
                        <div className="auth-logo-badge">
                            <Sparkles className="auth-logo-icon" />
                        </div>
                        <h1 className="auth-title">Colony</h1>
                        <p className="auth-subtitle">
                            {mode === "signin"
                                ? "Welcome back! Sign in to continue your productivity journey."
                                : "Join thousands of professionals working smarter and living better."}
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="auth-security-badge">
                        <Shield className="auth-security-icon" />
                        <span>256-bit SSL Encryption</span>
                        <Lock className="auth-security-icon" />
                    </div>

                    {/* Tabs */}
                    <AuthTabs mode={mode} switchMode={switchMode} />

                    {/* Forms */}
                    <div className="auth-form-wrapper">
                        {mode === "signin" ? (
                            <SignInForm
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                isSubmitting={isSubmitting}
                                errorMessage={errorMessage}
                                handleEmailSubmit={handleEmailSubmit}
                                handleGoogleSignIn={handleGoogleSignIn}
                                handleGithubSignIn={handleGithubSignIn}
                            />
                        ) : (
                            <SignUpForm
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                fullName={fullName}
                                setFullName={setFullName}
                                isSubmitting={isSubmitting}
                                errorMessage={errorMessage}
                                handleEmailSubmit={handleEmailSubmit}
                                handleGoogleSignIn={handleGoogleSignIn}
                                handleGithubSignIn={handleGithubSignIn}
                            />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="auth-footer-text">
                        <p>
                            By continuing, you agree to our{" "}
                            <a href="#" className="auth-link">Terms of Service</a>
                            {" "}and{" "}
                            <a href="#" className="auth-link">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}