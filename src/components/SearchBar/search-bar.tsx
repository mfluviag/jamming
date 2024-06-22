import React, { useState } from 'react';
import spotify from '../../util/Spotify'
import './search-bar.css';
// import fetch from 'node-fetch';
import { SearchBarProps, Track } from '../../types';

const SearchBar: React.FC<SearchBarProps> = ({ setResponseData }) => {

    // Setting States
    const [userInput, setUserInput] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const handleClick = async () => {
        try {
            const tracks: Track[] | undefined = await spotify.search(userInput);  // we await so reponseData not set until promise has returned
            setResponseData(tracks ?? []);
        } catch (error) {
            console.error(`Error fetching tracks: ${error}`)
        }
    }

    return (
        <div className='Search-form'>
            <input className='Search-bar-input' type="text" name="search bar" value={userInput} onChange={handleChange} />
            <button className='button search' onClick={handleClick}>SEARCH</button>
        </div>
    );
}

export default SearchBar;