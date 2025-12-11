import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [isGithubUser, setIsGithubUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);

                const providerIds = user.providerData.map((p) => p.providerId);

                setIsEmailUser(providerIds.includes("password"));
                setIsGoogleUser(providerIds.includes("google.com"));
                setIsGithubUser(providerIds.includes("github.com"));
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setIsEmailUser(false);
                setIsGoogleUser(false);
                setIsGithubUser(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        isGithubUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}