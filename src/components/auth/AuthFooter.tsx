import React from "react";

interface AuthFooterProps {
    mode: string;
    switchMode: (mode: string) => void;
}

export default function AuthFooter({ mode, switchMode }: AuthFooterProps) {
    return (
        <div className="auth-footer">
            {mode === "signin" ? (
                <>
                    Don&apos;t have an account?{" "}
                    <button
                        className="underline-button"
                        onClick={() => switchMode("signup")}
                    >
                        Sign up
                    </button>
                </>
            ) : (
                <>
                    Already have an account?{" "}
                    <button
                        className="underline-button"
                        onClick={() => switchMode("signin")}
                    >
                        Sign in
                    </button>
                </>
            )}
        </div>
    );
}
