import React, { useState } from 'react';
import '../App.css';

function Search() {
    const [userInput, setUserInput] = useState("");

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    return (
        <input className='Search-bar' type="text" name="search bar" value={userInput} onChange={handleChange}/>
    );
}

export default Search;