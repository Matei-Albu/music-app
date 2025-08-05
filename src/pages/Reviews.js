import React, { useState, useEffect } from 'react';
import Authentication from '../components/Authentication';
import SelectedSongs from '../components/SelectedSongs';
import Search from '../components/Search';

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <Authentication>
      {({ user, signOut }) => (
        <div style={{
          color: 'white',
        }}>
          <p style={{ textAlign: 'center', marginBottom: '30px' }}>
          </p>
          
          <Search 
            query={searchQuery}
            onQueryChange={handleQueryChange}
            onSubmit={handleSearch}
          />
          
          {searchResults.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Search Results:</h3>
            </div>
          )}
          
        </div>
      )}
    </Authentication>
  );
};

export default Reviews;