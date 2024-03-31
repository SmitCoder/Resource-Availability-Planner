export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
