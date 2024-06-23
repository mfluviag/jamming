import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Static Spotify variables
const client_id = '57d037e311ca4789b6ca99efbd389423';
const redirect_uri = 'http://localhost:3000/';
const auth_endpoint = 'https://accounts.spotify.com/authorize';
const response_type = 'token';
const scope = 'playlist-modify-public';

// Interface
interface AuthContextType {
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

// Context Object
const AuthContext = createContext<AuthContextType | undefined>(undefined);         // undefined = 

// Interface
interface AuthProviderProps {
    children: ReactNode;
}

// Context Object Provider
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {        // everything wrapped in this function will be used for children elements //
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('spotify_access_token'));   // come back to this later -> must be called on first render

    useEffect(() => {
        const expiryTime = Number(localStorage.getItem('spotify_access_token_expiry_Date'));
        if(!token || !expiryTime || expiryTime <= Date.now()) {
            refreshToken();
        }
        
        // set interval to automatically refresh token at expiry
        const interval = setInterval(() => {
            refreshToken();
        }, Number(localStorage.getItem('spotify_access_token_expiry'))); 

        const handleVisibilityChange = () => {
            if(document.visibilityState === 'visible') {
                if(!token || !expiryTime || expiryTime <= Date.now()) {
                    refreshToken();
                }
            }
        }
        
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        };
        
    }, [token]);  

    function refreshToken() {

        // navigate to spotify's auth request url
        const authRequestUrl = `${auth_endpoint}?response_type=${response_type}&scope=${scope}&client_id=${encodeURIComponent(client_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        window.location.href = authRequestUrl;

        // extract relevant params from the url
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const storedToken = params.get('access_token');
        console.log(storedToken);
        const expiresIn = params.get('expires_in');

        // set token state and store in local storage, then call timer to refresh token at expiry and store in local storage
        if(storedToken && expiresIn) {
            localStorage.setItem('spotify_access_token', storedToken);
            setToken(storedToken);

            const expiresInMiliseconds = parseInt(expiresIn, 10) * 1000;
            localStorage.setItem('spotify_access_token_expiry', expiresInMiliseconds.toString());
            localStorage.setItem('spotify_access_token_expiry_Date', (Date.now() + expiresInMiliseconds).toString());
        }
    }


    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error ("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { useAuth, AuthProvider };