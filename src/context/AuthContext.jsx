import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_EMAIL = 'thesharmakeshav@gmail.com';
const ADMIN_PASS = '355055';

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('ks_auth') === 'true';
    });

    const login = (email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            setIsAuthenticated(true);
            localStorage.setItem('ks_auth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('ks_auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
