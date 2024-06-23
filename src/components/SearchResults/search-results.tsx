import React from 'react';
import Tracklist from '../Tracklist/tracklist';
import { SearchResultsProps } from '../../types';

import './search-results.css';

const SearchResults: React.FC<SearchResultsProps> = ({ tracks, moveTrack }) => {

    return (
        <>
            <h2>Results</h2>
            <Tracklist tracks={tracks} plusSign='on' minusSign='off' moveTrack={moveTrack} />
        </>
    )

};

export default SearchResults;