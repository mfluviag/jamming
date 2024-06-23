import React from "react";
import { TrackProps } from "../../types";

import './track.css'

function Track( { track, plusSign, minusSign, moveTrack }: TrackProps ) {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectedTrackId = event.currentTarget.value;
        console.log(selectedTrackId);
        moveTrack(selectedTrackId);
    }
    
    return (
        <div className="track">
            <div className="track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <div className="track-action">
                <button className="track-button" onClick={handleClick} value={track.id} >
                    <span className={plusSign}>+</span><span className={minusSign}>-</span>
                </button>
            </div>
        </div>
    )

}

export default Track;