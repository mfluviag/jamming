import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Callback({ setTokenExpiresIn, setToken }) {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(window.location.hash);
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');
        console.log(`Access Token: ${accessToken}`);

        if (accessToken === null) {
            console.error('Access token is missing');
            navigate('/');
            return;
        };

        localStorage.setItem('spotify_access_token', accessToken);

        if (expiresIn === null) {
            console.error('ExpiresIn is missing');
            navigate('/');
            return;
        };

        const expiresInMiliseconds = parseInt(expiresIn, 10) * 1000;
        console.log(expiresInMiliseconds);

        localStorage.setItem('spotify_access_token_expiry', expiresInMiliseconds.toString());

        setTokenExpiresIn(expiresInMiliseconds);
        setToken(localStorage.getItem('spotify_access_token'));


        navigate('/');

    }, []);

    return <p>Loading...</p>;
}

export default Callback;