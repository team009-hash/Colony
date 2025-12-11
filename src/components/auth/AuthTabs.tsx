import React from "react";

interface AuthTabsProps {
    mode: string;
    switchMode: (mode: string) => void;
}

export default function AuthTabs({ mode, switchMode }: AuthTabsProps) {
    return (
        <div className="auth-tabs">
            <button
                type="button"
                className={`auth-tab ${
                    mode === "signin" ? "active" : "inactive"
                }`}
                onClick={() => switchMode("signin")}
            >
                Sign in
            </button>

            <button
                type="button"
                className={`auth-tab ${
                    mode === "signup" ? "active" : "inactive"
                }`}
                onClick={() => switchMode("signup")}
            >
                Sign up
            </button>
        </div>
    );
}
