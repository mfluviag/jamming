
// fetched search response from Spotify API
interface SpotifyTrackItemAlbum {
    name: string;
};

interface SpotifyTrackItemArtists {
    name: string;
};

interface SpotifyTrackItems {
    id: string;
    uri: string;
    name: string;
    artists: SpotifyTrackItemArtists[];
    album: SpotifyTrackItemAlbum;
};

export interface SpotifySearchResponse {
    tracks: {
        items: SpotifyTrackItems[];
    }
};

// fetched userId response from Spotify API
export interface UserId {
    id: string;
    uri: string;
};

export interface Playlist {
    id: string;
    uri: string;
};

// track interface
export interface Track {
    name: string;
    artist: string;
    album: string;
    id: string;
    uri: string;
};

export interface TrackProps {
    track: Track; 
    plusSign: string;
    minusSign: string; 
    moveTrack: (selectedTrackId: string) => void;
}

export interface TrackListProps {
    tracks: Track[]; 
    plusSign: string;
    minusSign: string; 
    moveTrack: (selectedTrackId: string) => void;
}

export interface SearchResultsProps {
    tracks: Track[]; 
    moveTrack: (selectedTrackId: string) => void;
}

export interface SearchBarProps {
    setResponseData: (tracks: Track[] ) => void;
}

