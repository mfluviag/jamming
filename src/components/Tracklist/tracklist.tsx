import React from "react";
import Track from "../Track/track";
import { TrackListProps } from "../../types";

import './tracklist.css'

const Tracklist: React.FC<TrackListProps> = ({ tracks, plusSign, minusSign, moveTrack }) => {
    if(!tracks) {
        return null;
    }

    const tracksList = tracks.map((track, index) => (
        <li key={index}><Track track={track} plusSign={plusSign} minusSign={minusSign} moveTrack={moveTrack} /></li>
    ))

    return (
        <ul>
            {tracksList}
        </ul>
    )

};

export default Tracklist;