import React from 'react';
import './SearchBar.css';

function SearchBar({ username, setUsername, handleSearch }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Enter LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
