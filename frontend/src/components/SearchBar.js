import React from "react";

function SearchBar({ searchQuery, handleSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        id="name"
        placeholder="Search By Name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
