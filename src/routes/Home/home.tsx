import './home.css';
import SearchBar from '../../components/SearchBar/search-bar';
import SearchResults from '../../components/SearchResults/search-results';
import Playlist from '../../components/Playlist/playlist';
import Tracklist from '../../components/Tracklist/tracklist';
// import Track from '../../components/Track/track';
import React, { useState } from 'react';
import { Track } from '../../types';

function Home() {

    const [searchTracks, setSearchTracks] = useState<Track[]>([]);
    const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);

    const addToPlaylist = (selectedTrackId: string) => {
        if(searchTracks) {
            const selectedTrack = searchTracks.find(item => item.id === selectedTrackId);
            if(selectedTrack) {
                setPlaylistTracks(prev => [...prev, selectedTrack]);
                setSearchTracks(prev => prev.filter(item => item.id !== selectedTrackId));
            }
        } 
    }

    const removeFromPlaylist = (selectedTrackId: string) => {
        if(playlistTracks) {
            const selectedTrack = playlistTracks.find(item => item.id === selectedTrackId);
            if(selectedTrack) {
                setSearchTracks(prev => [...prev, selectedTrack]);
                setPlaylistTracks(prev => prev.filter(item => item.id !== selectedTrackId));
            }
        } 
    }

    return (
        <div>
            <div>
                <SearchBar setResponseData={setSearchTracks} />
            </div>

            <div className="Container-main">
                <div className="Container-results">
                    <SearchResults tracks={searchTracks} moveTrack={addToPlaylist} />
                </div>
                <div className="Container-results">
                    <Playlist tracks={playlistTracks} moveTrack={removeFromPlaylist} />
                </div>
            </div>
        </div>
    );
}

export default Home;
