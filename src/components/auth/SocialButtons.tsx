// @ts-ignore
import React from "react";

interface SocialButtonsProps {
    handleGoogleSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleGithubSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isSignUp?: boolean;
}

export default function SocialButtons({
                                          handleGoogleSignIn,
                                          handleGithubSignIn,
                                          isSignUp = false
                                      }: SocialButtonsProps) {
    return (
        <div className="auth-social-buttons">
            {/* Google Button */}
            <button
                className="auth-social-button google"
                type="button"
                onClick={handleGoogleSignIn}
            >
                <svg className="brand-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{isSignUp ? "Sign up with Google" : "Continue with Google"}</span>
            </button>

            {/* GitHub Button */}
            <button
                className="auth-social-button github"
                type="button"
                onClick={handleGithubSignIn}
            >
                <svg className="brand-icon" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#24292e" d="M12 .5C5.73.5.75 5.48.75 11.77c0 5.07 3.29 9.37 7.87 10.89.57.1.77-.25.77-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.95 10.95 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.5 3.16-1.18 3.16-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.28 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.78.55 4.57-1.52 7.86-5.82 7.86-10.89C23.25 5.48 18.27.5 12 .5z"/>
                </svg>
                <span>{isSignUp ? "Sign up with GitHub" : "Continue with GitHub"}</span>
            </button>
        </div>
    );
}