import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [auth, setAuth] = useState({ token: null });

    const setAuthData = (token) => {
        console.log("Setting auth data with token:", token);
        setAuth({ token });
        if (token) {
            localStorage.setItem('token', token);
            setLoggedIn(true);
        } else {
            localStorage.removeItem('token');
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("App started, token in localStorage:", token);
        if (token) {
            setLoggedIn(true);
            setAuth({ token });
        }
    }, []);

    const contextValue = {
        loggedIn,
        setLoggedIn,
        auth,
        setAuthData
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;