import React, { useState } from "react";
import Tracklist from "../Tracklist/tracklist";
import spotify from "../../util/Spotify";
import './playlist.css';
import { SearchResultsProps } from "../../types";

const Playlist: React.FC<SearchResultsProps> = ({ tracks, moveTrack }) => {

    const [playlistInput, setPlaylistInput] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistInput(event?.target.value);
    }

    const handleClick = () => {
        const trackUris = tracks.map(track => track.uri)
        spotify.createPlaylist(trackUris, playlistInput);
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