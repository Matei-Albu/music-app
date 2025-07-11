import React from 'react';

const Search = ({ query, onQueryChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={onQueryChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;