import React, { useState } from "react";
import Tracklist from "../Tracklist/tracklist";
import spotify from "../../util/Spotify";
import './playlist.css';
import { SearchResultsProps } from "../../types";
import { useAuth } from "../../routes/Callback/auth-provider";

const Playlist: React.FC<SearchResultsProps> = ({ tracks, moveTrack }) => {

    const { token } = useAuth();

    const [playlistInput, setPlaylistInput] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistInput(event?.target.value);
    }

    const handleClick = () => {
        if(!playlistInput) {
            alert("Must provide a name to your playlist");
        } else {
            const trackUris = tracks.map(track => track.uri)
            spotify.createPlaylist(trackUris, playlistInput, token);    
        }
    }

    return (
        <>
            <input className="playlist-input" type="text" placeholder="Type playlist name..." value={playlistInput} onChange={handleChange} />
            <div className="container-tracklist" >
                <Tracklist tracks={tracks} plusSign='off' minusSign='on' moveTrack={moveTrack}/>
            </div>
            <button className='button save' onClick={handleClick}>save to spotify</button>
        </>
    )
};

export default Playlist;