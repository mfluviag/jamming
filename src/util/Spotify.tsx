import React from "react";
import { SpotifySearchResponse, Track, UserId, Playlist } from '../types.ts'

// Static Spotify variables
const client_id = '57d037e311ca4789b6ca99efbd389423';
const redirect_uri = 'http://localhost:3000/';
const auth_endpoint = 'https://accounts.spotify.com/authorize';
const response_type = 'token';
const scope= 'playlist-modify-public';

const spotify = {

    accessToken() {
        console.log("Starting accessToken()");

        return new Promise((resolve, reject) => {

            let storedToken = localStorage.getItem('spotify_access_token');

            if(storedToken) {
                console.log("Inside accessToken if...");
                resolve(storedToken);
            } else {
                console.log("Inside accessToken else...");
                const authRequestUrl = `${auth_endpoint}?response_type=${response_type}&scope=${scope}&client_id=${encodeURIComponent(client_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
                window.location.href = authRequestUrl;

                console.log(window.location.hash);
                const hash = window.location.hash;
                const params = new URLSearchParams(hash.substring(1));
                storedToken = params.get('access_token');
                const expiresIn = params.get('expires_in');
                console.log(`Access Token: ${storedToken}`);
        
                // if (accessToken === null) {
                //     console.error('Access token is missing');
                //     navigate('/');
                //     return;
                // };
        
                localStorage.setItem('spotify_access_token', storedToken);
        
                // if (expiresIn === null) {
                //     console.error('ExpiresIn is missing');
                //     navigate('/');
                //     return;
                // };
        
                const expiresInMiliseconds = parseInt(expiresIn, 10) * 1000;
                console.log(expiresInMiliseconds);
        
                localStorage.setItem('spotify_access_token_expiry', expiresInMiliseconds.toString());
        
                // setTokenExpiresIn(expiresInMiliseconds);
                // setToken(localStorage.getItem('spotify_access_token'));

                resolve(storedToken);


        //         const intervalId = setInterval(() => {
        //             storedToken = localStorage.getItem('spotify_access_token');
        //             if(storedToken) {
        //                 console.log("Token obtained after redirection, resolving...");
        //                 clearInterval(intervalId);
                        
        //                 resolve(storedToken);
        //             }
        //         }, 1000);
            }
        })
    },
    
    async search(userInput) {

        let authToken = await spotify.accessToken();

        // API endpoint definition
        const searchEndpoint = 'https://api.spotify.com/v1/search';
        const type = 'track';
        const apiEndpoint = `${searchEndpoint}?q=${userInput}&type=${type}`;

        // API request
        try {
            console.log("Sending request to Spotify API");

            const response = await fetch(apiEndpoint, {
                headers: { 
                    Authorization: `Bearer ${authToken}`
                }
            });

            console.log('HTTP Response Status:', response.status);

            if(response.ok) {
                const jsonResponse = await response.json() as SpotifySearchResponse;
                // console.log('Response Data:', jsonResponse.tracks[0].name);
                // console.log('Full Response Data:', JSON.stringify(jsonResponse))
                // console.log('Response Data:', jsonResponse.tracks.items[0].name);

                const tracks: Track[] = jsonResponse.tracks.items.map(item => ({
                    name: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name,
                    id: item.id,
                    uri: item.uri
                }));
                return tracks;
                // console.log(JSON.stringify(tracks));
                // console.log('Response Data:', jsonResponse);
                // setResponseData(jsonResponse);
                // localStorage.setItem('spotify_search_response', JSON.stringify(responseData));
            } else {
                const errorResponse = await response.text();
                console.log('Failed to fetch data:', errorResponse);
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (networkError) {
            console.error('Network error:', networkError.message);
        }
    },

    async getUserId() {

        const authToken = spotify.accessToken();

        // API endpoint definition
        const userApiEndpoint = 'https://api.spotify.com/v1/me';

        // API request to get user_id
        try {
            const response = await fetch(userApiEndpoint, {
                headers: { 
                    Authorization: `Bearer ${authToken}`
                }
            });

            if(response.ok) {
                const jsonResponse = await response.json() as UserId;
                const userId = jsonResponse.id;
                return userId;
            } else {
                const errorResponse = response.text();
                console.log('Failed to fetch data:', errorResponse);
                throw new Error('Request failed with status:' + response.status);
            }
        } catch(networkError) {
            console.error('Network error:', networkError.message);
        }
    },

    async createPlaylist(tracks, name) {

        const authToken = spotify.accessToken();

        // API endpoint definition
        const user_id = await spotify.getUserId();
        console.log(user_id);
        const apiEndpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;

        // API request to create a new Playlist
        try {
            console.log('Inside the try');
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name: name
                })
            })
            console.log('After the try');
            if(response.ok) {
                const jsonResponse = await response.json() as Playlist;
                const playlistId = jsonResponse.id;
                spotify.addTracksToPlaylist(playlistId, tracks);
            } else {
                const errorResponse = await response.text();
                console.log('Failed to fetch data:', errorResponse);
                throw new Error('Request failed with status:' + response.status);
            }

        } catch(networkError) {
            console.error('Network error:', networkError.message);
        }
    },

    async addTracksToPlaylist(playlistId, tracksToAdd) {
        const authToken = spotify.accessToken();

        // API endpoint definition
        const playlist_id = playlistId;
        const apiEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

        // API request to add new tracks to a Playlist
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    uris: tracksToAdd
                })
            })

            if(response.ok) {
                // const jsonResponse = await response.json() as Playlist;
                return;
            } else {
                const errorResponse = await response.text();
                console.log('Failed to fetch data:', errorResponse);
                throw new Error('Request failed with status:' + response.status);
            }

        } catch(networkError) {
            console.error('Network error:', networkError.message);
        }
    }
}

export default spotify;