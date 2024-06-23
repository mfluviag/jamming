import React from "react";
import './login.css'

const client_id = '57d037e311ca4789b6ca99efbd389423';
const redirect_uri = 'http://localhost:3000/callback';
const auth_endpoint = 'https://accounts.spotify.com/authorize';
const response_type = 'token';

const authRequestUrl = `${auth_endpoint}?response_type=${response_type}&client_id=${encodeURIComponent(client_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

// console.log(url);

function SpotifyLogin() {

    const handleLogin = () => {
        window.location.href = authRequestUrl;
    };

    return (
        <div className="login-container">
            <h2 className="login-text">Login to your Spotify account!</h2>
            <button className='button search' onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
}

export default SpotifyLogin;