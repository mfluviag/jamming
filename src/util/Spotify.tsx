import { SpotifySearchResponse, Track, UserId, Playlist } from '../types';

const spotify = {
    
    async search(userInput: string, authToken: string | null) {

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

                const tracks: Track[] = jsonResponse.tracks.items.map(item => ({
                    name: item.name,
                    artist: item.artists[0].name,
                    album: item.album.name,
                    id: item.id,
                    uri: item.uri
                }));
                return tracks;
            } else {
                const errorResponse = await response.text();
                console.log('Failed to fetch data:', errorResponse);
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (networkError) {
            if(networkError instanceof Error) {
                console.error('Network error:', networkError.message);
            } else {
                console.error('An unexpected error occurred:', networkError);
            }
        }
    },

    async getUserId(authToken: string | null) {

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
            if(networkError instanceof Error) {
                console.error('Network error:', networkError.message);
            } else {
                console.error('An unexpected error occurred:', networkError);
            }
        }
    },

    async createPlaylist(tracks: string[], name: string, authToken: string | null) {

        // API endpoint definition
        const user_id = await spotify.getUserId(authToken);
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
                spotify.addTracksToPlaylist(playlistId, tracks, authToken);
            } else {
                const errorResponse = await response.text();
                console.log('Failed to fetch data:', errorResponse);
                throw new Error('Request failed with status:' + response.status);
            }

        } catch(networkError) {
            if(networkError instanceof Error) {
                console.error('Network error:', networkError.message);
            } else {
                console.error('An unexpected error occurred:', networkError);
            }
        }
    },

    async addTracksToPlaylist(playlistId: string, tracksToAdd: string[], authToken: string | null) {

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
            if(networkError instanceof Error) {
                console.error('Network error:', networkError.message);
            } else {
                console.error('An unexpected error occurred:', networkError);
            }
        }
    }
}

export default spotify;